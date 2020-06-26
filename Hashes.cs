// Two sum using hashset

public class Solution {
    public int[] TwoSum(int[] nums, int target) {   
      
      List<int> sum = new List<int>();
      HashSet<int> hash = new HashSet<int>();

      for (int i = 0; i < nums.Length; i++)
      {
        var x = nums[i];
        int opposite = target - x;
        if(hash.Contains(opposite)) {
          sum.Add(Array.IndexOf(nums, opposite));
          sum.Add(i);
        }
        hash.Add(x);
      }
      return sum.ToArray();
    }
}
