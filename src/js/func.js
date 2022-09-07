export const changeTime=(time)=>{
let minutes = parseInt(time/60);
let seconds = parseInt(((time/60)%1)*60);
return minutes+":"+seconds;
}