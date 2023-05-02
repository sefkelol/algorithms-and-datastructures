class Node {
  constructor(val, priority){
    this.val = val
    this.priority = priority 
  }
}

class PriorityQueue {
  constructor(){
    this.values = []
  }
  
  enqueue(val, priority){
    let newNode = new Node(val, priority)
    this.values.push(newNode)
    this.bubbleUp()
  }

  bubbleUp(){
    let idx = this.values.length - 1
    let element = this.values[idx]

    while(idx > 0){
      let parentIdx = Math.floor((idx - 1)/2)
      let parent = this.values[parentIdx]
      if(element.priority >= parent.priority) break
      this.values[idx] = parent
      this.values[parentIdx] = element
      idx = parentIdx
    }
  }

  dequeue() {
    if (!this.values.length) return

    this.swap(0, this.values.length - 1)
    const oldNode = this.values.pop()
    
    let parent = 0, childLeft = 1, childRight = 2
    // Math.max returns NaN is one of the arguments is undefined
    let min = Math.min(this.values[childLeft].priority, this.values[childRight].priority || -Infinity)

    while (this.values[parent] < min) {
      let child = this.values[childLeft].priority === min ? childLeft : childRight
      this.swap(parent, child)
      parent = child
      childLeft = parent * 2 + 1
      childRight = parent * 2 + 2 
      min = Math.max(this.values[childLeft], this.values[childRight] || -Infinity)
    }
    return oldNode
  }

  swap(inx1, inx2) {
    [this.values[inx1], this.values[inx2]] = [this.values[inx2], this.values[inx1]]
  }

}