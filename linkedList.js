// You will need two classes or factories:

// LinkedList class / factory, which will represent the full list.
// Node class / factory, containing a value property and a link to the nextNode, 
  //set both as null by default.
// Build the following functions in your linked list class / factory:

// append(value) adds a new node containing value to the end of the list
// prepend(value) adds a new node containing value to the start of the list
// size returns the total number of nodes in the list
// head returns the first node in the list
// tail returns the last node in the list
// at(index) returns the node at the given index
// pop removes the last element from the list
// contains(value) returns true if the passed in value is in the list and otherwise
  // returns false.
// find(value) returns the index of the node containing value, or null if not found.
// toString represents your LinkedList objects as strings, so you can print them out 
  //and preview them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null
// Extra credit
// insertAt(value, index) that inserts a new node with the provided value at the given index.
// removeAt(index) that removes the node at the given index.
// Extra Credit Tip: When you insert or remove a node, consider how it will affect 
  //the existing nodes. Some of the nodes will need their nextNode link updated.


class LinkedList{

    constructor(headNode=null){
        this.headNode=headNode;
    }

append(value){

    let node=new Node(value);

    //if list is empty, make new node head
    if(!this.headNode){
        this.headNode=node;
        return;
    }

   //else traverse till end
   let current=this.headNode;
   while(current.nextNode){
    current=current.nextNode;
   }

   //attach new node to last
    current.nextNode=node;
}

prepend(value){
    //new node pointing to current head
    let node=new Node(value, this.headNode);
    //make new node the head
    this.headNode=node;
}

size(){
    let current=this.headNode;
    let len=0;
    while(current){
    len++;
    current=current.nextNode;
}
return len;
}

head(){
return this.headNode;
}

tail(){
    if(!this.headNode) return null;
    let current=this.headNode;
    while(current.nextNode){
        current=current.nextNode;
    }

    return current;
}

checkIndexBound(index){
    let size=this.size();
    if( index>size || index<0 ){
     return false;   
    }
    return true;
}
at(index){
    if(this.checkIndexBound(index)){
    let current=this.headNode;
    let i=0;
    while(current && i<index){
        current=current.nextNode;
        i++;
    }

return current;
    }

let error="Index out of bound!";
return error;

}

insertAt(value, index){

    if(index === 0){
        this.prepend(value);
        return;
    }

    let node=new Node(value);
    let current=this.headNode;
    let previous;
    let i=0;
    while(i!==index){
     previous=current;
     current=current.nextNode;
     i++;
    }
    previous.nextNode=node;
    node.nextNode=current;

}

removeAt(index){

    if(!this.headNode) return;
    if(index==0){
        this.headNode = this.headNode.nextNode;
        return;
    }
    let current=this.headNode;
    let previous = null;
    let i=0;

    while(i!==index){
        previous=current;
        current=current.nextNode;
        i++;
    }

    previous.nextNode=current.nextNode;  

}

pop(){
     // If list is empty or has only one node, set head to null.
     if (!this.headNode || !this.headNode.nextNode) {
        this.headNode = null;
        return;
    }

    let current = this.headNode;

    // Traverse the list until reaching the second-to-last node
    while (current.nextNode && current.nextNode.nextNode) {
        current = current.nextNode;
    }

    current.nextNode = null;

}

contains(value){
let current = this.headNode;
while(current){

    if(current.value === value){
        return true;
    }
    current = current.nextNode;

}

return false;
}


find(value){

    let current = this.headNode;
    let index=0;
    while(current){

        if(current.value === value){
            return index;
        }
        current=current.nextNode;
        index=index+1;
    }
    return null;
}

toString(){
    let current=this.headNode;
    let result=" ";
while(current){
    result+=current.value + "->";
    current= current.nextNode;
}

//after last node append null
result+="null";
console.log(result);
}
}

class Node{
    constructor(value=null, nextNode=null){
    this.value= value;
    this.nextNode=nextNode;
    }
}

let list=new LinkedList();
list.append(1);
list.append(2);
list.append(8);
list.prepend(9);
list.toString();
console.log(`Size: ${list.size()}`);
list.pop();
list.toString();
console.log(list.find(2));
console.log(list.find(3));
console.log(list.at(2));
console.log(list.head());
console.log(list.tail());
list.insertAt(3,2);
list.toString();
list.removeAt(1);
list.toString();
console.log(list.at(8));