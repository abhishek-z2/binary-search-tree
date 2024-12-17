class Node{
    constructor(data){
        this.data=data;
        this.left=null;
        this.right=null;
    }
}


function Tree(array){
  function buildTree(array){
    newArray = [...new Set(array)];
    newArray.sort((a,b)=> a-b);
    
    function arrayToBST(array,start,end){
      if(start>end) return null
      const mid = start + Math.floor((end-start)/2);
      const root = new Node(array[mid]);
      root.left=arrayToBST(array,start,mid-1);
      root.right=arrayToBST(array,mid+1,end);
      return root;
    };

    return arrayToBST(newArray,0,newArray.length-1);
  }
  
  let root = buildTree(array);
    
    const prettyPrint = (node, prefix = "", isLeft = true) => {
      if (node === null) {
        return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };

      function insert(value){
        const newNode = new Node(value);
        if(root===null) root=newNode;
        else insertRecursively(root,newNode);
      }

      function insertRecursively(root,newNode){
        if(newNode.data<root.data){
            if(!root.left){
                root.left=newNode;
            } else insertRecursively(root.left,newNode);
        } else if(newNode.data>root.data){
            if(!root.right){
                root.right=newNode;
            } else insertRecursively(root.right,newNode);
        }
      }
     
      function deleteItem(value){
        root = deleteRecursively(root,value);
      }

      function deleteRecursively(root,value){
        if(root===null) return root;
        
        if(value<root.data)
          root.left= deleteRecursively(root.left,value);
        else if(value>root.data)
          root.right=deleteRecursively(root.right,value)
        else{
          if(root.left===null)
            return root.right;
          else if(root.right===null)
            return root.left;
        }

        root.data = findMin(root.right);
        root.right=deleteRecursively(root.right,root.data);

      }

      function findMin(root){
        let current = root;
        while(current.left!==null)
          current=current.left;
        return current.data;
      }

      function find(value){
        return findRecursively(root,value);
      }
      function findRecursively(node,value){
        if(node===null || node.data===value)
          return node;
        if(value>node.data)
          return findRecursively(node.right,value);
        return findRecursively(node.left,value);
      }

      function levelOrder(callback){
        if(typeof callback !== "function"){
          throw new Error("a callback function is required");
        }

        if(root===null) return;

        const queue = [];
        queue.push(root);

        while(queue.length>0){
          const currentNode = queue.shift();
          callback(currentNode);

          if(currentNode.left)
            queue.push(currentNode.left)
          if(currentNode.right)
            queue.push(currentNode.right)
          

        }
      }

      function inorder(callback){
        if(typeof callback!== "function"){
          throw new Error("provide a function as callback");
        }
        function inorderTraversal(node){
          if(node===null) return;

          inorderTraversal(node.left);
          callback(node);
          inorderTraversal(node.right);

        }
        inorderTraversal(root);
      }

      function preorder(callback) {
        if (typeof callback !== "function") {
            throw new Error("Provide a function as a callback");
        }
    
        function preorderTraversal(node) {
            if (node === null) return;
    
            callback(node);             
            preorderTraversal(node.left); 
            preorderTraversal(node.right);
        }
    
        preorderTraversal(root); 
    }

    function postorder(callback) {
      if (typeof callback !== "function") {
          throw new Error("Provide a function as a callback");
      }
  
      function postorderTraversal(node) {
          if (node === null) return; 
  
          postorderTraversal(node.left); 
          postorderTraversal(node.right); 
          callback(node);                
      }
  
      postorderTraversal(root); 
  }
 
  function height(node){
    if(node===null) return -1;

    const leftHeight=height(node.left);
    const rightHeight=height(node.right);

    return Math.max(leftHeight,rightHeight);
  }

  function depth(node){
    function calculateDepth(currentNode,currentDepth){
      if(currentNode===null) return -1;
      if(currentNode===node) return currentDepth;

      const leftDepth = calculateDepth(currentNode.left,currentDepth+1);
      if(leftDepth!== -1) return leftDepth;

      const rightDepth = calculateDepth(currentNode.right,currentDepth+1);
      return rightDepth;
    }

    return calculateDepth(root,0);
  }

  function isBalanced(){
    
    function checkHeight(node){
      if(node===null) return 0;

      const leftHeight = checkHeight(node.left);
      const rightHeight = checkHeight(node.right);

      if(leftHeight===-1 || rightHeight===-1) return -1;

      if(Math.abs(leftHeight-rightHeight)>1) return -1;

      return Math.max(leftHeight,rightHeight)+1;
    }

    return checkHeight(root) !== -1;
  }

  function rebalance(){
    const newArray=[];
    inorder((node)=>{
      newArray.push(node.data);
    })

    root = buildTree(newArray);
  }

return {prettyPrint,root,insert,deleteItem,find,levelOrder,inorder,preorder,postorder,height,depth,isBalanced,rebalance}

}

function getArray(){
  let newArray = []
  for(let i=0;i<15;i++){
    newArray.push(Math.floor(Math.random()*100));
  }
  return newArray
}
console.log(getArray())

const bst = Tree(getArray());
console.log(bst.root);
bst.prettyPrint(bst.root);


console.log(bst.isBalanced());

bst.levelOrder((node)=>{
  console.log(node.data);
});
bst.inorder((node)=>{
  console.log(node.data);
});

bst.preorder((node)=>{
  console.log(node.data);
});

bst.postorder((node)=>{
  console.log(node.data);
});


bst.insert(101)
bst.insert(199)
bst.insert(405)
bst.insert(182)
bst.insert(300)

console.log(bst.isBalanced());
bst.rebalance();
console.log(bst.isBalanced());



bst.levelOrder((node)=>{
  console.log(node.data);
});
bst.inorder((node)=>{
  console.log(node.data);
});

bst.preorder((node)=>{
  console.log(node.data);
});

bst.postorder((node)=>{
  console.log(node.data);
});
