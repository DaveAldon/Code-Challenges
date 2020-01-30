/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    // quick testing if it's valid
    if (height == null || height.length === 0 || height.length === 2) return 0;

    let left = 0;
    let right = height.length - 1
    
    let maxleft = 0;
    let maxright = 0;
    
    let water = 0;
    
    // While the two ends haven't met yet
    while(left < right) {
        // If the left side is lower than the right
        if(height[left] < height[right]) {
            // calc the leftmost max of the current iteration
            maxleft = Math.max(maxleft,height[left])
            // water is equal to the difference of the max and how far down the "hill" went
            water+= maxleft-height[left]
            // iterate right
            left++;
        // otherwise if the rightside is lower
        } else {
            // calc the rightmost maximum
            maxright = Math.max(maxright,height[right])
            // water is equal to difference
            water+= maxright-height[right]
            // move left
            right--;
        }
    }
    return water;
}
