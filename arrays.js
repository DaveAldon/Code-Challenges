// Two Sum, return indexes

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var sums = [];
    var hash = {};
    
    nums.forEach(function(val,i) {
        
        var opposite = target - val;
        
        if (hash[opposite] !== undefined) {
            sums.push(nums.indexOf(opposite));
            sums.push(i)
        }
        
        hash[val] = val
    });
    return sums
};

// Subarray Sum Equals K

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    var count = 0;
    for (i = 0; i<nums.length; i++) {
        var sum = 0;
        for (y = i; y<nums.length; y++) {
            sum+=nums[y];
            if(sum == k) count++;
        }
    }
    return count;
};

// Remove duplicates in place

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    nums.splice(0, nums.length, ...(new Set(nums)));
};

// Rotate array

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    for(var i = k; i > 0; i--) {
        nums.unshift(nums.pop())
    }
};

// Stock profit

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    var profit = 0;
    for(var i = 0; i<prices.length-1;i++) {
        if(prices[i] < prices[i+1]) profit += prices[i+1] - prices[i]
    }
    return profit
};

// Contains duplicate

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    return (nums.length !== new Set(nums).size)
};

// Single number 

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    var a = 0
    nums.forEach(function(i) {
      a ^= i
    })
    return a
};
