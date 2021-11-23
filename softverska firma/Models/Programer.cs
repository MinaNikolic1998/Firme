using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Programer
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Ime { get; set; }

        [Required]
        [MaxLength(50)]
        public string Prezime { get; set; }

        [Required]
        [Range(16, 70)]
        public int Starost { get; set; }

        [Required]
        [MaxLength(20)]
        public string Senioritet { get; set; }

        [Required]
        [Range(100, 10000)]
        public int Plata { get; set; }
        [JsonIgnore]
        public Projekat Projekat { get; set; }

    }
}