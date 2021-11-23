using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace softverska_firma.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FirmaController : ControllerBase
    {
        public FContext Context { get; set; }
        public FirmaController(FContext context)
        {
            Context = context;
        }
        [Route("PreuzmiFirme")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiFirme()
        {
            try
            {
                var firme = await Context.Firme
                                         //.Include(p => p.Projekti)
                                         //.ThenInclude(p => p.Programeri)
                                         .ToListAsync();

                return Ok(firme);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("PreuzmiLokacijeFirmi")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiLokacijeFirmi()
        {
            try
            {
                var firmeLokacije = await Context.Firme.Select(p => new { p.Lokacija }).ToListAsync();
                return Ok(firmeLokacije);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Route("DodajFirmu")]
        [HttpPost]
        public async Task<ActionResult> DodajFirmu([FromBody] Firma firma)
        {
            if (string.IsNullOrEmpty(firma.Naziv))
            {
                return BadRequest("Naziv firme nije validan");
            }
            if (firma.BrojZaposlenih < 1 || firma.BrojZaposlenih > 10000)
            {
                return BadRequest("Broj zaposlenih nije validan");
            }
            if (firma.GodinaOsnivanja < 1950 || firma.GodinaOsnivanja > 2021)
            {
                return BadRequest("Godina osnivanja nije validna");
            }
            if (firma.Lokacija.Length > 50)
            {
                return BadRequest("Lokacija nije validna");
            }
            if (firma.OsnovneInformacije.Length > 500)
            {
                return BadRequest("Osnovne informacije nisu validne");
            }
            if (firma.Kontakt.Length > 50)
            {
                return BadRequest("Kontakt nije validan");
            }
            try
            {
                Context.Firme.Add(firma);
                await Context.SaveChangesAsync();
                return Ok($"Firma sa ID-em {firma.ID} je uspesno dodata!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("DodajProjekatUFirmu/{idFirme}")]
        [HttpPost]
        public async Task<ActionResult> DodajProjekatUFirmu([FromBody] Projekat projekat, int idFirme)
        {
            var firma = await Context.Firme.FindAsync(idFirme);

            if (string.IsNullOrEmpty(projekat.Naziv))
            {
                return BadRequest("Naziv projekta nije validan");
            }
            if (string.IsNullOrEmpty(projekat.Tip) || projekat.Tip.Length > 20)
            {
                return BadRequest("Tip projekta nije validan");
            }
            if (string.IsNullOrEmpty(projekat.OcekivanoTrajanje) || projekat.OcekivanoTrajanje.Length > 20)
            {
                return BadRequest("Ocekivano trajanje nije validno");
            }
            if (string.IsNullOrEmpty(projekat.Prioritet) || projekat.Prioritet.Length > 20)
            {
                return BadRequest("Prioritet nije validan");
            }

            projekat.Firma = firma;
            Context.Projekti.Add(projekat);
            await Context.SaveChangesAsync();
            int identifikator = projekat.ID;
            return Ok(identifikator);

        }
        [Route("IzmeniFirmu")]
        [HttpPut]
        public async Task<ActionResult> IzmeniFirmu([FromBody] Firma firma)
        {
            if (string.IsNullOrEmpty(firma.Naziv))
            {
                return BadRequest("Naziv firme nije validan");
            }
            if (firma.BrojZaposlenih < 1 || firma.BrojZaposlenih > 10000)
            {
                return BadRequest("Broj zaposlenih nije validan");
            }
            if (firma.GodinaOsnivanja < 1950 || firma.GodinaOsnivanja > 2021)
            {
                return BadRequest("Godina osnivanja nije validna");
            }
            if (firma.Lokacija.Length > 50)
            {
                return BadRequest("Lokacija nije validna");
            }
            if (firma.OsnovneInformacije.Length > 500)
            {
                return BadRequest("Osnovne informacije nisu validne");
            }
            if (firma.Kontakt.Length > 50)
            {
                return BadRequest("Kontakt nije validan");
            }
            try
            {
                Context.Firme.Update(firma);
                await Context.SaveChangesAsync();
                return Ok($"Firma sa ID-em {firma.ID} je uspesno izmenjena");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("ObrisiFirmu/{id}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiFirmu(int id)
        {
            if (id <= 0)
            {
                return BadRequest("ID nije validan!");
            }
            try
            {
                var firma = await Context.Firme.FindAsync(id);
                var projekti = await Context.Projekti.Where(p => p.Firma.ID == id).Include(p => p.Programeri).ToListAsync();
                projekti.ForEach(proj =>
                {
                    Context.Projekti.Remove(proj);
                });
                if (firma != null)
                {
                    Context.Firme.Remove(firma);
                    await Context.SaveChangesAsync();
                    return Ok("Firma je uspesno obrisana");
                }
                else
                {
                    return BadRequest("Firma nije pronadjena");
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }

}
