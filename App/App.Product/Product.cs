namespace App.Product
{
    public class Product
    {
        private static int sayac = 0;
        private int id;
        public Product()
        {
            sayac++;
            id = sayac;

        }
        public int Id
        {
            get
            {
                return id;
            }
        }

        public string? Name { get; set; }
        public float Price { get; set; }
        public string? Category { get; set; }




    }

}
