// Build a function mergeSort that takes in an array and returns a sorted array, using a recursive merge sort methodology. 
//An input of [3, 2, 1, 13, 8, 5, 0, 1] should return [0, 1, 1, 2, 3, 5, 8, 13], and an input of [105, 79, 100, 110] should return [79, 100, 105, 110].
// Tips:
// Think about what the base case is and what behavior is happening again and again and can actually be delegated to someone else (e.g. that same function!).
// It may be helpful to check out the background videos again if you don’t quite understand what should be going on.

//[1,3,5,6,2];
function mergeSort(arr, low=0, high=arr.length){

    if(arr.length<=1){
        return arr;
    }

    let mid=Math.floor((low+high)/2); 
    let left=arr.slice(low, mid);
    let right=arr.slice(mid,high);    

    
    return merge(mergeSort(left), mergeSort(right));

}

function merge(left,right){
    let arr=[];
    
   let indexLeft=0;
   let indexRight=0;
   while(indexLeft<left.length && indexRight<right.length){
    if(left[indexLeft]>right[indexRight]){
        arr.push(right[indexRight]);
        indexRight++;
    }else{
        arr.push(left[indexLeft]);
        indexLeft++;
    }
   }
   while (indexLeft < left.length) {
    arr.push(left[indexLeft]);
    indexLeft++;
}

while (indexRight < right.length) {
    arr.push(right[indexRight]);
    indexRight++;
}

return arr;
}
let arr=[1,3,5,6,2];
sort=mergeSort(arr);
console.log(sort);