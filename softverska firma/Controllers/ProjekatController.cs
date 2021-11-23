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
    public class ProjekatController : ControllerBase
    {
        public FContext Context { get; set; }
        public ProjekatController(FContext context)
        {
            Context = context;
        }
        [Route("PreuzmiProjekte/{idFirme}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiProjekte(int idFirme)
        {
            try
            {
                var projekti = (await Context.Firme.Where(p => p.ID == idFirme).Include(p => p.Projekti).FirstOrDefaultAsync()).Projekti;
                return Ok(projekti);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("PreuzmiNaziveProjekata/{idFirme}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiNaziveProjekata(int idFirme)
        {
            try
            {
                var naziviProjekata = await Context.Projekti.Where(p => p.Firma.ID == idFirme).Select(p => p.Naziv).ToListAsync();
                return Ok(naziviProjekata);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("DodajProjekat")]
        [HttpPost]
        public async Task<ActionResult> DodajProjekat([FromBody] Projekat projekat)
        {
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

            try
            {
                Context.Projekti.Add(projekat);
                await Context.SaveChangesAsync();
                return Ok($"Projekat sa ID-em {projekat.ID} je uspesno dodat!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Route("IzmeniProjekat/{id}/{noviNaziv}/{noviTip}/{noviPrioritet}/{novoOcekivanoTrajanje}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniProjekat(int id, string noviNaziv, string noviTip, string noviPrioritet, string novoOcekivanoTrajanje)
        {
            if (string.IsNullOrEmpty(noviNaziv))
            {
                return BadRequest("Naziv projekta nije validan");
            }
            if (string.IsNullOrEmpty(noviTip) || noviTip.Length > 20)
            {
                return BadRequest("Tip projekta nije validan");
            }
            if (string.IsNullOrEmpty(novoOcekivanoTrajanje) || novoOcekivanoTrajanje.Length > 20)
            {
                return BadRequest("Ocekivano trajanje nije validno");
            }
            if (string.IsNullOrEmpty(noviPrioritet) || noviPrioritet.Length > 20)
            {
                return BadRequest("Prioritet nije validan");
            }
            try
            {
                var projekatZaIzmenu = await Context.Projekti.FindAsync(id);
                if (projekatZaIzmenu != null)
                {
                    projekatZaIzmenu.Naziv = noviNaziv;
                    projekatZaIzmenu.Tip = noviTip;
                    projekatZaIzmenu.Prioritet = noviPrioritet;
                    projekatZaIzmenu.OcekivanoTrajanje = novoOcekivanoTrajanje;
                    Context.Projekti.Update(projekatZaIzmenu);
                    await Context.SaveChangesAsync();
                    return Ok($"Projekat je uspesno izmenjen");
                }
                else
                {
                    return BadRequest($"Projekat sa ID-em {projekatZaIzmenu.ID} nije nadjen");
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("ObrisiProjekat/{id}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiProjekat(int id)
        {
            if (id <= 0)
            {
                return BadRequest("ID nije validan!");
            }
            try
            {
                var projekat = await Context.Projekti.FindAsync(id);
                var programeri = await Context.Programeri.Where(p => p.Projekat.ID == id).ToListAsync();
                programeri.ForEach(prog =>
                {
                    Context.Programeri.Remove(prog);
                });
                if (projekat != null)
                {
                    projekat.Firma = null;
                    Context.Projekti.Remove(projekat);
                    await Context.SaveChangesAsync();
                    return Ok("Projekat je uspesno obrisana");
                }
                else
                {
                    return BadRequest("Projekat nije pronadjen");
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }

}
