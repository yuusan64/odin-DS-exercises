//balanced binary search tree

class Node{
    constructor(data,left=null,right=null){
     this.data=data;
     this.left=left;
     this.right=right;
    }
}

class Tree{
    constructor(arr,root=null){
        this.arr=arr;
        this.root=this.buildTree(this.arr);
    }


    buildTree(array){

    let sorted=this.mergeSort(array);
    let size=sorted.length-1;
    let start=0;
    let end=size;
    let mid=Math.floor((start+end)/2);
    
    if(start>end) return null;
    
    let root=sorted[mid];
    let node=new Node(root);
    let left=sorted.slice(0,mid);
    let right=sorted.slice(mid+1);
    node.left=this.buildTree(left);
    node.right=this.buildTree(right);

    return node;
    }

    insert(value, node=this.root){


        if (!node) {
            this.root = new Node(value);
            return; 
        }

        if(value<node.data){
          if(node.left===null){
            node.left=new Node(value);
          }else{
            this.insert(value,node.left);
          }
        }else if(value > node.data){
            if(node.right===null){
                node.right=new Node(value);
            }else{
                this.insert(value, node.right);
            }
        }
    }

    delete(value, node=this.root){

        if(node === null) return null;

        if(value < node.data){
            node.left = this.delete(value, node.left);
        }else if(value>node.data){
            node.right = this.delete(value, node.right);
        }else{
         
            //node with only one or no child
            if(node.left===null){
                return node.right;
            }else if(node.right===null){
                return node.left
            }

         //if node has 2 children, get successor

         node.data = this.findMinValue(node.right);
  
         //delete successor
         node.right = this.delete(node.data, node.right);

        }
        return node;
    }

    findMinValue(node){
        let minv = node.data;
        while(node.left!==null){
            minv = node.left.data;
            node = node.left;
        }
        return minv;
    }
    find(value, node=this.root){

        if(node.data===value){
            return node;
        }
        else if(value>node.data){
            this.find(value, node.right)
        }
        else{
            this.find(value, node.left);
        }

    }

    callback(node) {
        console.log(node.data);
    }

    levelOrder(root=this.root, callback){

        if(root==null) return [];
        let queue=[root];
        let result=[];

        while(queue.length>0){
            //dequeue current node
            let currentNode=queue.shift();
            
            if(!currentNode) continue;

            if(callback){
                callback(currentNode);
            }else{
                result.push(currentNode.data);
            }

            //enqueue left and right children

            if(currentNode.left!==null){
                queue.push(currentNode.left);
            }
            if(currentNode.right!==null){
                queue.push(currentNode.right);
            }
        }
        
        return callback ? undefined: result;
    }

    inOrder(root=this.root, callback){

    //left, root, right

    let result=[];

    function traverse(node){
        

        if(!node) return;

        //traverse left subtree
        traverse(node.left);

        //visit root(current node)

        if(callback){
            callback(node);
        }else{
            result.push(node.data);
        }

        //traverse right subtree
        traverse(node.right);
    }

    //start traversing from root
    traverse(root);

    return callback? undefined:result;

    }

    preOrder(root=this.root, callback){
    
    //root, left, right

    let result=[];

    function traverse(node){
        
        if(!node) return;
      
        if(callback){
            callback(node);
        }else{
            result.push(node.data);
        }
        //traverse left

        traverse(node.left);

        //traveerse right

        traverse(node.right);

    }

    traverse(root);

    return callback ? undefined: result;
    }

    postOrder(root=this.root, callback){
    
    //left, right, root

    let result=[];

    function traverse(node){
        if(!node) return;

        traverse(node.left);

        traverse(node.right);

        if(callback){
            callback(node);
        }else{
            result.push(node.data);
        }
    }

    traverse(root);

    return callback ? undefined : result;

    }


    height(node){
    
     if(node===null) return -1;
     let leftHeight=this.height(node.left);
     let rightHeight=this.height(node.right);

     return Math.max(leftHeight, rightHeight) +1;
    }

    depth(node) {
        // null node has depth 0
        if (node === null) {
            return 0;
        }
    
        // Recursively find the depth of the left and right subtrees
        let leftDepth = maxDepth(node.left);
        let rightDepth = maxDepth(node.right);
    
     
        return Math.max(leftDepth, rightDepth) + 1;
    }

    isBalanced(node = this.root) {
        if (!node) {
            return true;
        }
        
        let leftHeight = node.left ? this.height(node.left) : -1;
        let rightHeight = node.right ? this.height(node.right) : -1;
    
        if (Math.abs(leftHeight - rightHeight) > 1) return false; // Unbalanced at current node
    
        // Recursive checks; only proceed if children exist
        return (!node.left || this.isBalanced(node.left)) && (!node.right || this.isBalanced(node.right));
    }
    
    rebalance(){
        const elements=this.inOrder();
        this.root = this.buildTree(elements);
    }

    mergeSort(arr){
        if(arr.length<=1){
            return arr;
        }
    
        let mid=Math.floor((arr.length)/2); 
        let left=arr.slice(0, mid);
        let right=arr.slice(mid);    
    
        
        return this.merge(this.mergeSort(left), this.mergeSort(right));
    
    }
    
    merge(left, right) {
        let result = [];
        let indexLeft = 0;
        let indexRight = 0;
    
        while (indexLeft < left.length && indexRight < right.length) {
            if (left[indexLeft] < right[indexRight]) {
                result.push(left[indexLeft]);
                indexLeft++;
            } else if (left[indexLeft] > right[indexRight]) {
                result.push(right[indexRight]);
                indexRight++;
            } else {
                // When elements are equal, push one and increment both indices to skip duplicates
                result.push(left[indexLeft]);
                indexLeft++;
                indexRight++;
            }
        }
    
        // Concatenate the remaining parts
       
        while (indexLeft < left.length) {
            result.push(left[indexLeft]);
            indexLeft++;
        }
        while (indexRight < right.length) {
            result.push(right[indexRight]);
            indexRight++;
        }
    
        return result;
    }
    prettyPrint = (node=this.root, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
}
function generateRandomArray(size, max) {
    return Array.from({length: size}, () => Math.floor(Math.random() * max));
}


// Create a binary search tree
let randomNumbers = generateRandomArray(10, 100);
let tree = new Tree(randomNumbers);
console.log(randomNumbers);
// check if tree is balanced
console.log("Is the tree initially balanced?", tree.isBalanced() ? "Yes" : "No");

// Print out all elements in level, pre, post, and in order
console.log("Level Order:", tree.levelOrder());
tree.prettyPrint();
console.log("Preorder:", tree.preOrder());
tree.prettyPrint();
console.log("Postorder:", tree.postOrder());
tree.prettyPrint();
console.log("Inorder:", tree.inOrder());

// Unbalancing the tree
[101, 102, 103, 104].forEach(num => tree.insert(num));

// check tree is unbalanced
console.log("Is the tree unbalanced after additions?", tree.isBalanced() ? "No" : "Yes");

// Balance it
tree.rebalance();

// Confirm the tree is balanced
console.log("Is the tree balanced after rebalancing?", tree.isBalanced() ? "Yes" : "No");

// Print out all elements again in level, pre, post, and in order
console.log("Level Order after rebalancing:", tree.levelOrder());
tree.prettyPrint();
console.log("Preorder after rebalancing:", tree.preOrder());
tree.prettyPrint();
console.log("Postorder after rebalancing:", tree.postOrder());
tree.prettyPrint();
console.log("Inorder after rebalancing:", tree.inOrder());
tree.prettyPrint();
