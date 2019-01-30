namespace MonAmie.ViewModels
{
    public class CategoryViewModel
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public bool CanInterest { get; set; }
        public bool CanGroup { get; set; }
        public bool CanEvent { get; set; }
    }
}
