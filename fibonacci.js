//fibonacci sum
function fibSum(num){
    if(num<2){
        return num;
    }

   return fibSum(num-1) + fibSum(num-2);
}

let seriesSum=fibSum(8);
console.log(seriesSum);

//fibonacci series

function fibSeries(num, n1=0,n2=1, arr=[n1,n2]){

    let next=n1+n2;

    if(next>=num){
        return arr;
    }

    arr.push(next);
    return fibSeries(num,n2,next,arr);
}

let series=fibSeries(8);
console.log(series);