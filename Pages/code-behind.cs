using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Data.SqlClient;
using System.ComponentModel.DataAnnotations;

namespace Razor_projem.Pages
{
    public class IndexModel : PageModel
    {
        public List<Kisi> Kisiler { get; set; } = new List<Kisi>();

        string baglantiString = "Server=localhost;Database=Veritabanım;User Id=sa;Password=daspwd;TrustServerCertificate=true;";

        public bool Error { get; set; }
        public void OnGet([FromQuery] bool error)
        {
            Error = error;

            try
            {
                using (SqlConnection baglanti = new SqlConnection(baglantiString))
                {
                    baglanti.Open();
                    SqlCommand komut = new SqlCommand("SELECT * FROM Kisiler", baglanti);
                    using (SqlDataReader reader = komut.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Kisiler.Add(new Kisi
                            {
                                ID = reader.GetInt32(0),
                                isim = reader.GetString(1),
                                yas = reader.GetInt32(2)
                            });
                        }
                    }
                }
            }
            catch
            {
                OnGet(error);
            }
        }

        [BindProperty]
        [Required]
        public string yeniIsim { get; set; }

        [BindProperty]
        [Required]
        public int yeniYas { get; set; }

        public IActionResult OnPostEkle()
        {
            using (SqlConnection baglanti = new SqlConnection(baglantiString))
            {
                try
                {
                    if (yeniYas < 0 || string.IsNullOrEmpty(yeniIsim) || string.IsNullOrWhiteSpace(yeniIsim)) throw new Exception();

                    baglanti.Open();

                    SqlCommand komut = new SqlCommand("INSERT INTO Kisiler (isim, yas) VALUES (@isim, @yas)", baglanti);

                    komut.Parameters.AddWithValue("@isim", yeniIsim);
                    komut.Parameters.AddWithValue("@yas", yeniYas);

                    komut.ExecuteNonQuery();

                    return RedirectToPage();
                }

                catch
                {
                    return RedirectToPage(new { Error = true } );
                }
            }
        }
    }

    public class Kisi
    {
        public int ID { get; set; }
        public string isim { get; set; }
        public int yas { get; set; }
    }
}
