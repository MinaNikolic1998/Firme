export class Programer
{
    constructor(id,ime,prezime,starost,senioritet,plata){
        this.id=id;
        this.ime=ime;
        this.prezime=prezime;
        this.starost=starost;
        this.senioritet=senioritet;
        this.plata=plata;
        this.miniKontejner=null;
    }
    crtajProgramera(host){
        if(!host)
            throw new Error("Roditeljski element ne postoji");
        this.miniKontejner= document.createElement("div");
        host.appendChild(this.miniKontejner);
        const progIkonica = document.createElement("span");
        progIkonica.className="bi bi-person";
        const divProgramer=document.createElement("div");
        
        divProgramer.innerHTML=this.ime+" "+this.prezime;
        const dugmeX = document.createElement("span");
        dugmeX.className="bi bi-x-square";
        divProgramer.appendChild(dugmeX);
        divProgramer.appendChild(progIkonica);
        this.miniKontejner.appendChild(divProgramer);
        dugmeX.onclick = (ev) => {
            this.obrisiProgramera();
            alert("Uspesno ste obrisali programera!");
        }
     
    }
    obrisiProgramera(){
        fetch("https://localhost:5001/Programer/ObrisiProgramera/" + this.id, {
            method: "DELETE"
        }).then(p => {
            if (p.ok) {
                this.miniKontejner.style.display="none";
            }
        });  
    }
}