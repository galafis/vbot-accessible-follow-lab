import {object,number,array,boolean,version,round} from './contract.mjs';
export function analyze(s) {
  version(s); const p=object(s.preferences,'preferences');
  number(p.min_distance_m,'min_distance_m'); number(p.max_distance_m,'max_distance_m',p.min_distance_m);
  number(p.max_speed_mps,'max_speed_mps'); number(p.max_gap_s,'max_gap_s',Number.MIN_VALUE);
  const rows=array(s.samples,'samples'); if(rows.length<2) throw new Error('At least two samples required');
  rows.forEach((r,i)=>{
    object(r,'sample'); number(r.t_s,'t_s'); number(r.distance_m,'distance_m'); number(r.speed_mps,'speed_mps');
    boolean(r.person_stopped,'person_stopped'); boolean(r.robot_moving,'robot_moving');
    if(i && r.t_s<=rows[i-1].t_s) throw new Error('Times must strictly increase');
  });
  let observed=0, unknown=0, preferred=0, mismatch=0; const intervals=[];
  for(let i=0;i<rows.length-1;i++){
    const r=rows[i],dt=rows[i+1].t_s-r.t_s;
    const reasons=[];
    if(dt>p.max_gap_s){unknown+=dt;reasons.push('observation_gap');}
    else {
      observed+=dt;
      if(r.distance_m<p.min_distance_m) reasons.push('too_close');
      if(r.distance_m>p.max_distance_m) reasons.push('too_far');
      if(r.speed_mps>p.max_speed_mps) reasons.push('pace_exceeded');
      if(r.person_stopped&&r.robot_moving){reasons.push('stop_mismatch');mismatch+=dt;}
      if(!reasons.length) preferred+=dt;
    }
    intervals.push({from_s:r.t_s,to_s:rows[i+1].t_s,duration_s:round(dt),reasons});
  }
  return {mode:'offline_observation_replay',total_s:round(observed+unknown),observed_s:round(observed),
    unknown_s:round(unknown),preference_match_s:round(preferred),
    preference_match_fraction:observed?round(preferred/observed):null,stop_mismatch_s:round(mismatch),intervals};
}
