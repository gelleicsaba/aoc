export const xor=(b:number,c:number):number=>{
    let b_=b.toString(2).padStart(50,'0').split('')
    let c_=c.toString(2).padStart(50,'0').split('')
    let d=Array(50)
    for (let x=0;x<50;++x) {
      d[x]=(b_[x]=='0'&&c_[x]=='1')||(b_[x]=='1'&&c_[x]=='0')?'1':'0'
    }
    return parseInt(d.join(''),2)
}
