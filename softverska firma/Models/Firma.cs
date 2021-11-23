using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Firma
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Naziv { get; set; }

        [Required]
        [Range(1, 10000)]
        public int BrojZaposlenih { get; set; }

        [Required]
        [Range(1950, 2021)]
        public int GodinaOsnivanja { get; set; }

        [Required]
        [MaxLength(50)]
        public string Lokacija { get; set; }

        [Required]
        [MaxLength(500)]
        public string OsnovneInformacije { get; set; }

        [Required]
        [MaxLength(50)]
        public string Kontakt { get; set; }

        public List<Projekat> Projekti { get; set; }

    }
}