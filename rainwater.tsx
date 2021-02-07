/*
Calculate trapped areas in an array.
Input -> [4,2,0,3,2,5]
Receive -> 9
*/

function trap(height: number[]): number {
    // quick testing if it's valid
    if(height === null || height.length < 3) return 0;
    
    let left = 0;
    let right = height.length - 1;
    
    let leftMax = 0;
    let rightMax = 0;
    
    let water = 0;
    
    // While the two ends haven't met yet
    while(left < right) {
        // If the left side is lower than the right
        if(height[left] < height[right]) {
            // calc the leftmost max of the current iteration
            leftMax = Math.max(leftMax,height[left])
            // water is equal to the difference of the max and how far down the "hill" went
            water += leftMax - height[left]
            // iterate right
            left++;
        // otherwise if the rightside is lower or equal to left
        } else {
            // calc the rightmost maximum
            rightMax = Math.max(rightMax,height[right])
            // water is equal to difference
            water += rightMax - height[right]
            // move left
            right--;
        }
    }
    return water
};
