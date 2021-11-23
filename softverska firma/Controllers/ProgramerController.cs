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
    public class ProgramerController : ControllerBase
    {
        public FContext Context { get; set; }
        public ProgramerController(FContext context)
        {
            Context = context;
        }
        [Route("PreuzmiProgramere/{idProjekta}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiProgramere(int idProjekta)
        {
            try
            {
                var programeri = await Context.Programeri.Include(p => p.Projekat).Where(p => p.Projekat.ID == idProjekta).ToListAsync();
                return Ok(programeri);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("DodajProgrameraNaProjekat/{idProjekta}")]
        [HttpPost]
        public async Task<ActionResult> DodajProgrameraNaProjekat([FromBody] Programer programer, int idProjekta)
        {
            var projekat = await Context.Projekti.FindAsync(idProjekta);
            if (string.IsNullOrEmpty(programer.Ime) || programer.Ime.Length > 30)
            {
                return BadRequest("Ime koje ste uneli nije validno");
            }
            if (string.IsNullOrEmpty(programer.Prezime) || programer.Prezime.Length > 30)
            {
                return BadRequest("Prezime koje ste uneli nije validno");
            }
            if (programer.Starost < 16 || programer.Starost > 70)
            {
                return BadRequest("Starost koju ste uneli nije validna");
            }
            if (string.IsNullOrEmpty(programer.Senioritet) || programer.Senioritet.Length > 20)
            {
                return BadRequest("Senioritet koji ste uneli nije validan");
            }
            if (programer.Plata < 100 || programer.Plata > 10000)
            {
                return BadRequest("Plata koju ste uneli nije validna");
            }
            if (projekat != null)
            {
                programer.Projekat = projekat;
                Context.Programeri.Add(programer);
                await Context.SaveChangesAsync();
                int identifikator = programer.ID;
                return Ok(identifikator);
            }
            else
            {
                return BadRequest("Projekat sa datim identifikatorom nije pronadjen");
            }


        }
        [Route("ObrisiProgramera/{id}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiProgramera(int id)
        {
            if (id <= 0)
            {
                return BadRequest("ID nije validan!");
            }
            try
            {
                var programer = await Context.Programeri.FindAsync(id);
                if (programer != null)
                {
                    programer.Projekat = null;
                    Context.Programeri.Remove(programer);
                    await Context.SaveChangesAsync();
                    return Ok("Programer je uspesno obrisan!");
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
