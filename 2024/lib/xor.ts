export const xor=(b:number,c:number):number=>{
  let b_=b.toString(2).padStart(50,'0')
  let c_=c.toString(2).padStart(50,'0')
  let d=0
  let n=1
  for (let x=49;x>=0;--x) {
      if ((b_[x]=='0'&&c_[x]=='1')||(b_[x]=='1'&&c_[x]=='0')) d+=n
      n*=2
  }
  return d
}