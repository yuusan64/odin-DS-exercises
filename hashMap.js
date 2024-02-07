class ListNode{
    constructor(key,value,next){
        this.key=key;
        this.value=value;
        this.next=next;
    }
}
class HashMap{
    constructor(capacity=16){
     bucket=new Array(capacity).fill(null);
     this.capacity=capacity;
     this.size=0;
     this.maxLoadFactor = 0.75; // Resize when 75% full
    }

    hash(key){
    let hashCode = 0;
    let primeNumber=31;

    for(let i=0; i<key.length; i++){
        hashCode=((hashCode*primeNumber)+key.charCodeAt(i))%(this.capacity);
    }
     
    return hashCode;
    }

    set(key, value){
        
        let index=this.hash(key);

        if(!this.bucket[index]){
          this.bucket[index]=new ListNode(key,value);
        }else{
          
          let node = this.bucket[index];
          while(node.next!==null && node.key!==key)  {
            node=node.next;
          }
          if(node.key===key){
            // Update existing key
            node.value=value;
          }else{
            // Add new entry at the end
            node.next=new ListNode(key,value);
          }
        }
        this.size++;

        if(this.needsResizing()){
            this.resize();
        }
    }
 
    needsResizing() {
        return this.size / this.capacity > this.maxLoadFactor;
    }

    resize() {
        const oldBucket = this.bucket;

         // Double the capacity
        this.capacity *= 2; 
       
        this.bucket = new Array(this.capacity).fill(null);
        this.size = 0; 
    
        oldBucket.forEach(head => {
            let node = head;
            while (node !== null) {
                // Rehash each entry to new bucket
                this.set(node.key, node.value); 
                node = node.next;
            }
        });
    }

    get(key){
        const index = this.hash(key);
        let node = this.bucket[index];
        while (node!==null & node.key!==null){
            node=node.next;
        }
        return node !== null ? node.value : null;
    }

    has(key){
        const index=this.hash(key);
        let node=this.bucket[index];

        while(node!==null){
            if(node.key==key){
                return true;
            }
            node=node.next;
        }
        return false;
    }

    remove(key){
        const index = this.hash(key);
        let node=this.bucket[index];
        let prev=null;

        while(node !== null && node.key !== key){
            prev=node;
            node=node.next;
        }
        //key not found
        if(node === null) return false;
        if(prev == null){
            //remove first node
            this.bucket[index]=node.next;
        } else{
            //bypass the node to remove
            prev.next = node.next;
        }
        this.size --;
        return true;
    }

    length(){
        return this.size;
    }

    clear(){
        this.bucket=new Array(this.capacity).fill(null);
        this.size=0;
    }

    keys(){
        let keys=[];
        for(let i=0; i<this.capacity; i++){
            let node = this.bucket[i];
             
            //if bucket not empty, traverse the linked list
            while(node!==null){
                keys.push(node.key);
                node = node.next;
            } 

        }
        return keys;
    }

    values(){
        let values = [];
        for(let i=0; i<this.capacity;i++){
           let node=this.bucket[i];

           while(node!==null){
            values.push(node.value);
            node=node.next;
           }
        }
        return values;
    }

    entries(){
        let entries=[];

        for(let i=0; i<this.capacity;i++){
            let node=this.bucket[i];
            while(node!==null){
                entries.push([node.key, node.value]);
                node=node.next;

            } 
        }
        return entries;
    }
}