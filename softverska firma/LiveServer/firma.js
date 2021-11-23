import {Projekat} from "./projekat.js";
export class Firma
{
    constructor(id,naziv,brojZaposlenih,godinaOsnivanja,lokacija,osnovneInformacije,kontakt){
        this.id=id;
        this.naziv=naziv;
        this.brojZaposlenih=brojZaposlenih;
        this.godinaOsnivanja=godinaOsnivanja;
        this.lokacija=lokacija;
        this.osnovneInformacije=osnovneInformacije;
        this.kontakt=kontakt;
        this.projekti=[];
        this.kontejner=null;   
    }
    dodajProjekat(projekat){
        this.projekti.push(projekat);
    }
    crtajFirmu(host)
    {
        if(!host)
            throw new Error("Roditeljski element ne postoji!");
        this.kontejner = document.createElement("div");
        this.kontejner.className="kontFirma";
        host.appendChild(this.kontejner);

        const divLevi = document.createElement("div");
        divLevi.className="divLevi";
        this.kontejner.appendChild(divLevi);

        const divDesni = document.createElement("div");
        divDesni.className="divDesni";
        this.kontejner.appendChild(divDesni);

        const divInfoFirma = document.createElement("div");
        divInfoFirma.className="divInfoFirma";
        divLevi.appendChild(divInfoFirma);

        let labelaNaziv = document.createElement("h3");
        labelaNaziv.innerHTML=this.naziv;
        divInfoFirma.appendChild(labelaNaziv);
    
        let nizLabela=["Godina osnivanja: ", "Lokacija: ", "Osnovne informacije: ","Kontakt: "];
        let nizVrednosti=[this.godinaOsnivanja,this.lokacija,this.osnovneInformacije,this.kontakt];
        let pomocneLabela=null;
        let pomocniDiv=null;
        nizLabela.forEach((element,index) => {
            pomocneLabela=document.createElement("label");
            pomocniDiv=document.createElement("div");
            pomocneLabela.innerHTML= element + nizVrednosti[index];
            pomocniDiv.appendChild(pomocneLabela);
            divInfoFirma.appendChild(pomocniDiv);
        })
        const dugmePrikaziProjekte=document.createElement("button");
        dugmePrikaziProjekte.innerHTML="Prikazi projekte";
        dugmePrikaziProjekte.classList.add("btn-primary");
        dugmePrikaziProjekte.classList.add("dugmePrikaziProjekte");
        divInfoFirma.appendChild(dugmePrikaziProjekte);
        dugmePrikaziProjekte.onclick = (ev) => {
            
                this.vratiSveProjekte();
                dugmePrikaziProjekte.disabled=true;
                this.proveriStanjeDugmetaPrikaz();
        
        }
        // this.projekti.forEach(projekat => {
        //     projekat.crtajProjekat(this.kontejner.querySelector(".divDesni"));
        // })    
        console.log(this.projekti);
        //dodavanje projekta
        const divDodavanje = document.createElement("div");
        divDodavanje.className="divDodavanje";
        divLevi.appendChild(divDodavanje);
        let naslovForma = document.createElement("label");
        naslovForma.innerHTML="Dodaj projekat";
        divDodavanje.appendChild(naslovForma);
        const nizZaFormu = ["Naziv: ", "Tip: ", "Prioritet: ", "Ocekivano trajanje: "];
        const nizZaSelektovanje=["nazivDodaj","tipDodaj","prioritetDodaj","ocekivanoTrajanjeDodaj"];
        const tipoviUnosa = ["input", "input", "select", "input"];
        let labForma=null;
        let divUnosi=null;
        let unosi=null;
        let op = null;
        let vrednostOpcije = ["visok", "srednji", "nizak"];
        nizZaFormu.forEach((element,index) => {
            labForma=document.createElement("label");
            divUnosi=document.createElement("div");
            unosi=document.createElement(tipoviUnosa[index]);
            unosi.className=nizZaSelektovanje[index];
            labForma.innerHTML=element;
            divUnosi.appendChild(labForma);
            divUnosi.appendChild(unosi);
            divDodavanje.appendChild(divUnosi);
        })
        const selekt = this.kontejner.querySelector(".prioritetDodaj");
        vrednostOpcije.forEach((el, ind) => {
            op = document.createElement("option");
            op.value=vrednostOpcije[ind];
            op.innerHTML=vrednostOpcije[ind];
            selekt.appendChild(op);
        })

        const dugmeZaUnos = document.createElement("button");
        dugmeZaUnos.classList.add("btn-danger");
        dugmeZaUnos.classList.add("dugmeZaUnosProjekta");
        dugmeZaUnos.innerHTML="Dodaj projekat";
        dugmeZaUnos.disabled=true;
        divDodavanje.appendChild(dugmeZaUnos);
        dugmeZaUnos.onclick = (ev) => {
                this.dodajProjekatUFirmu();
            }            
        }      
    proveriStanjeDugmetaPrikaz(){
        const dugmePrik = this.kontejner.querySelector(".dugmePrikaziProjekte");
        const dugmeUnosProjekta=this.kontejner.querySelector(".dugmeZaUnosProjekta");
        if(dugmePrik.disabled==true){
            dugmeUnosProjekta.disabled=false;
        }
    }
    vratiSveProjekte(){
    
        const divZaCrtanje=this.kontejner.querySelector(".divDesni");
        fetch("https://localhost:5001/Projekat/PreuzmiProjekte/"+this.id, {
    method: "GET"
     }).then(p => p.json().then(projekti =>
        projekti.forEach((projekat)=> {
            const proj = new Projekat(projekat.id,projekat.naziv,projekat.tip,projekat.prioritet,projekat.ocekivanoTrajanje);
            proj.crtajProjekat(divZaCrtanje);
        }))
 
     );
}
    
    dodajProjekatUFirmu(){

        const naziv =this.kontejner.querySelector(".nazivDodaj").value;
        const tip=this.kontejner.querySelector(".tipDodaj").value;
        const prioritet=this.kontejner.querySelector(".prioritetDodaj").value;
        const ocekivanoTrajanje =this.ocekivanoTrajanje=this.kontejner.querySelector(".ocekivanoTrajanjeDodaj").value;
        this.proveriValidnostPodataka(naziv, tip, prioritet,ocekivanoTrajanje);

        fetch("https://localhost:5001/Firma/DodajProjekatUFirmu/" + this.id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "naziv":naziv,
                    "tip": tip,
                    "prioritet": prioritet,
                    "ocekivanoTrajanje": ocekivanoTrajanje
                })
            }).then(p => {
                if (p.ok) {
                    p.json().then(q => {
                        console.log(q);
                        let projekat = new Projekat(q,naziv,tip,prioritet,ocekivanoTrajanje);
                        projekat.Firma=this;
                        this.dodajProjekat(projekat);
                        console.log(this.projekti);
                        projekat.crtajProjekat(divD);
                    })
                    
                }
            }).catch(p => {
                alert("Doslo je do greske prilikom upisa");
            });
        this.obrisiPrikazIzForme();
        const divD = this.kontejner.querySelector(".divDesni");
       

     }
     proveriValidnostPodataka(name,type,priority,duration)
     {  
        if(name.length > 50 || name.length == 0)
        {
            alert("Naziv ne moze biti duzi od 50 karaktera ili prazan");
            return;
        }
         
        if(type.length > 20 || type.length == 0)
        {
            alert("Tip ne moze biti duzi od 20 karaktera ili prazan");
            return;
        }
         
        if(priority.length > 20 || priority.length == 0)
        {
            alert("Prioritet ne moze biti duzi od 20 karaktera ili prazan");
            return;
        }
         
        if(duration.length > 50 || duration.length == 0)
        {
            alert("Ocekivano trajanje ne moze biti duze od 20 karaktera ili prazan");
            return;
        }
     }
     obrisiPrikazIzForme()
     {
         this.kontejner.querySelector(".nazivDodaj").value="";
         this.kontejner.querySelector(".tipDodaj").value="";
         this.kontejner.querySelector(".prioritetDodaj").value="";
         this.kontejner.querySelector(".ocekivanoTrajanjeDodaj").value="";
     }
}

