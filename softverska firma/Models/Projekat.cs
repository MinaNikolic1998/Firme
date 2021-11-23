using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Projekat
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Naziv { get; set; }

        [Required]
        [MaxLength(20)]
        public string Tip { get; set; }

        [Required]
        [MaxLength(20)]
        public string Prioritet { get; set; }

        [Required]
        [MaxLength(20)]
        public string OcekivanoTrajanje { get; set; }

        [JsonIgnore]
        public Firma Firma { get; set; }
        public List<Programer> Programeri { get; set; }

    }
}