/**
 * Created by DaisyCream on 16/1/15.
 */
var s = new Array();



function ss(str, n){
    for(var i=0;i<n;i++){
        str[i] = new Array();
    }
}

ss(s,4);
s[0][2] = 4;
console.log(s[0][2]);