class Graph{

    constructor(){
        this.adjacencyList={};
    }

    //add vertex

    addVertex(vertex){
        if(!this.adjacencyList[vertex]){
            this.adjacencyList[vertex]=[];
        }
    }

    //add edge between two vertices

    addEdge(vertex1, vertex2){
        if(this.adjacencyList[vertex1] && this.adjacencyList[vertex2]){
            this.adjacencyList[vertex1].push(vertex2);
            this.adjacencyList[vertex2].push(vertex1);

        }else{
            console.log(`Check vertices: ${vertex1}, ${vertex2}`);
        }
    }

    //generate graph with all possible knight moves 

    buildKnightGraph(){
        const boardSize=8;

        for(let row=0; row<boardSize; row++){
            for(let col=0; col<boardSize; col++){
                let vertex = this.coordToVertex(row, col);
                this.addVertex(vertex);

                let moves=this.knightMoves(row,col);

                moves.forEach(([r,c]) => {
                    this.addEdge(vertex, this.coordToVertex(r,c));
                    
                });
            }
        }
        console.log(this.adjacencyList); 
    }
        //convert board coordinates to vertex key

        coordToVertex(row, col){
            return `${row}-${col}`;
        }

        //calculate valid knight moves from position

        knightMoves(row, col){
            const moves=[
                [2,1],[2,-1],[-2,1],[-2,-1],
                [1,2],[1,-2],[-1,2],[-1,-2]
            ];

            const validMoves=[];

            moves.forEach(([dr,dc])=>{
                const newRow = row+dr;
                const newCol = col+dc;

                if(newRow >=0 && newRow<8 && newCol >=0 && newCol <8){
                    validMoves.push([newRow, newCol]);
                }
            });
            return validMoves
        }

        //BFS to find shortest path from start to target

        bfs(start, target){
         
            let queue= [[start]];
            let visited = new Set([start]);

            while(queue.length){
            
                let path=queue.shift();
                let current=path[path.length -1];

                if(current === target) return path;

                this.adjacencyList[current].forEach(neighbor =>{
                    if(!visited.has(neighbor)){
                        visited.add(neighbor);
                        queue.push([...path, neighbor]);
                    }
                });

            }
          
        return [];


        }


    }



const graph = new Graph();
graph.buildKnightGraph();
const start = graph.coordToVertex(0,0); 
const target = graph.coordToVertex(7,7);
const shortestPath = graph.bfs(start, target);

console.log(`Shortest Path from ${start} to ${target}: `, shortestPath);
