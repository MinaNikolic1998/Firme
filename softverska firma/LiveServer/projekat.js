import { Programer } from "./programer.js";
export class Projekat
{
    constructor(id,naziv,tip,prioritet,ocekivanoTrajanje){
        this.id=id;
        this.naziv=naziv;
        this.tip=tip;
        this.prioritet=prioritet;
        this.ocekivanoTrajanje=ocekivanoTrajanje;
        this.programeri=[];
        this.miniKontejner=null;
    }
    dodajProgramera(programer){
        this.programeri.push(programer);
    }
    bojaNaOsnovuPrioriteta(){
        if(this.prioritet == "visok")
            this.miniKontejner.style.backgroundColor="rgb(235, 148, 134)";
        else if (this.prioritet == "srednji"){
            this.miniKontejner.style.backgroundColor="rgb(243, 222, 138)";
        }
        else if(this.prioritet == "nizak"){
            this.miniKontejner.style.backgroundColor="rgb(202, 231, 185)";
        }
        
    }
    crtajProjekat(host){
        if(!host)
            throw new Exception("Roditeljski element ne postoji!");
        this.miniKontejner=document.createElement("div");
        host.appendChild(this.miniKontejner);
        this.miniKontejner.className="divProjekatKartica";
        const naslovKartice = document.createElement("h4");
        naslovKartice.innerHTML=this.naziv;
        naslovKartice.className="naslovKartice";
        this.miniKontejner.appendChild(naslovKartice);
        this.miniKontejner.style.backgroundColor=this.bojaNaOsnovuPrioriteta();
        let nizLabela = ["Naziv: ", "Tip: ", "Prioritet: ", "Ocekivano trajanje: "];
        let nizVrednosti=[this.naziv, this.tip, this.prioritet, this.ocekivanoTrajanje];
        let nizVrednostiIzmena=["nazivIzmena", "tipIzmena", "prioritetIzmena", "ocekivanoTrajanjeIzmena"];
        let labele=null;
        let miniDivovi=null;
        nizLabela.forEach((element,index)=> {
            labele=document.createElement("labela");
            miniDivovi=document.createElement("div");
            labele.innerHTML= element + " "+ nizVrednosti[index];
            labele.classList.add(nizVrednostiIzmena[index]);
            miniDivovi.appendChild(labele);
            this.miniKontejner.appendChild(miniDivovi);
        })
        const dugmeZaUpdate = document.createElement("button");
        dugmeZaUpdate.innerHTML="Izmeni";
        dugmeZaUpdate.className="bi bi-pencil btn-primary";
        const dugmeZaBrisanje = document.createElement("button");
        dugmeZaBrisanje.innerHTML="Obrisi";
        dugmeZaBrisanje.className="bi bi-trash btn-danger";
        this.miniKontejner.appendChild(dugmeZaUpdate);
        this.miniKontejner.appendChild(dugmeZaBrisanje);   
        dugmeZaBrisanje.onclick = (ev) => {
            this.obrisiProjekat();
        }
        
        //modali za azuriranje projekta
        const divModal = document.createElement("div");
        divModal.classList.add("modal");
        const divModalContent = document.createElement("div");
        divModalContent.className="modal-content";
        const span = document.createElement("span");
        span.className="close-btn";
        span.innerHTML="&times;"
        divModal.appendChild(divModalContent);
        divModalContent.appendChild(span);
        this.miniKontejner.appendChild(divModal);
        //polja za izmenu
        let labeleModal= ["Naziv: ", "Tip: ","Prioritet: ", "Ocekivano trajanje: "];
        let labeleKlase = ["naziv", "tip", "prioritet", "ocekivanoTrajanje"];
        let inicijalniPrikaz = [this.naziv, this.tip, this.prioritet, this.ocekivanoTrajanje];
        let poljaModalTipovi = ["input","input","select", "input"];
        let vrednostOpcije =["visok", "srednji", "nizak"];
        let poljaModal = null;
        let pomLab=null;
        let maliDiv=null;
        let op=null;
        labeleModal.forEach((element, index) => {
            pomLab = document.createElement("label");
            pomLab.innerHTML=element;
            poljaModal = document.createElement(poljaModalTipovi[index]);
            poljaModal.value=inicijalniPrikaz[index];
            poljaModal.className=labeleKlase[index];
            divModalContent.appendChild(pomLab);
            divModalContent.appendChild(poljaModal);
        })
        const selekt = this.miniKontejner.querySelector(".prioritet");
        vrednostOpcije.forEach((el, ind) => {
            op = document.createElement("option");
            op.value=vrednostOpcije[ind];
            op.innerHTML=vrednostOpcije[ind];
            selekt.appendChild(op);
        })
        const dugmeUModaluIzmena = document.createElement("button");
        dugmeUModaluIzmena.className="btnIzmeniModal";
        dugmeUModaluIzmena.innerHTML="Sacuvaj izmene";
        divModalContent.appendChild(dugmeUModaluIzmena);
        const dugmeUModaluOdustani = document.createElement("button");
        dugmeUModaluOdustani.className = "btnOdustaniModal";
        dugmeUModaluOdustani.innerHTML="Odustani od izmene";
        divModalContent.appendChild(dugmeUModaluOdustani);
        dugmeUModaluIzmena.onclick = (ev) => {
            this.izmeniProjekat();
            divModal.style.display="none";
           
        }
        dugmeZaUpdate.onclick = function(){
           divModal.style.display="block";
        }
        dugmeUModaluOdustani.onclick = (ev) => {
            divModal.style.display="none";
        }
        span.onclick = (ev) => {
            divModal.style.display="none";
        }

        const divModalProgramer = document.createElement("div");
        divModalProgramer.classList.add("modal");
        const divModalContentProgramer = document.createElement("div");
        divModalContentProgramer.className="modal-content";
        const spanProgramer = document.createElement("span");
        spanProgramer.className="close-btn";
        spanProgramer.innerHTML="&times;"
        divModalProgramer.appendChild(divModalContentProgramer);
        divModalContentProgramer.appendChild(spanProgramer);
        this.miniKontejner.appendChild(divModalProgramer);

       
        const labeleZaProgramera=["Ime: ", "Prezime: ", "Starost: ", "Senioritet: ", "Plata: "];
        const inputiZaProgramera =["input", "input", "input", "select", "input", "select"];
        const tipoviInputaProgramer=["text","text","number","text", "number","text"];
        const inputiKlase = ["ime","prezime","starost","senioritet","plata"];
        const opcijeZaSenioritet=["junior","medior","senior"];
        let divZaPrikaz=null;
        let labeleProg=null;
        let inputProg=null;
        let opProg=null;
        let opProj=null;
        labeleZaProgramera.forEach((el,ind)=> {
            divZaPrikaz=document.createElement("div");
            labeleProg=document.createElement("label");
            inputProg=document.createElement(inputiZaProgramera[ind]);
            labeleProg.innerHTML=labeleZaProgramera[ind];
            inputProg.className=inputiKlase[ind];
            if(inputProg.className!="senioritet" && inputProg.className!="projekat"){
                inputProg.type=tipoviInputaProgramer[ind];
            }
            divModalContentProgramer.appendChild(labeleProg);
            divModalContentProgramer.appendChild(inputProg);
            
        })
        const selektProgramer = this.miniKontejner.querySelector(".senioritet");
        opcijeZaSenioritet.forEach((el, ind) => {
            opProg = document.createElement("option");
            opProg.value=opcijeZaSenioritet[ind];
            opProg.innerHTML=opcijeZaSenioritet[ind];
            selektProgramer.appendChild(opProg);
        })
        const dugmeSacuvajProgramera = document.createElement("button");
        dugmeSacuvajProgramera.innerHTML="Dodaj programera na projekat";
        divModalContentProgramer.appendChild(dugmeSacuvajProgramera);
        dugmeSacuvajProgramera.onclick = (ev) => {
            this.dodajProgrameraNaProjekata();
            this.ocistiPrikazProgramera();
            divModalProgramer.style.display="none";
        }
        const dugmeZaDodavanjeProgramera= document.createElement("button");
        dugmeZaDodavanjeProgramera.innerHTML="Dodaj programera";
        dugmeZaDodavanjeProgramera.classList.add("dugmeDodajProgramera");
        dugmeZaDodavanjeProgramera.classList.add("btn-primary");
        dugmeZaDodavanjeProgramera.disabled=true;
        this.miniKontejner.appendChild(dugmeZaDodavanjeProgramera);
        dugmeZaDodavanjeProgramera.onclick = (ev) => {
            divModalProgramer.style.display="block";
        }
        const dugmeIzadjiIzModala = document.createElement("button");
        dugmeIzadjiIzModala.innerHTML="Odustani";
        divModalContentProgramer.appendChild(dugmeIzadjiIzModala);
        dugmeIzadjiIzModala.onclick = (ev) => {
            divModalProgramer.style.display="none";
        }
        spanProgramer.onclick = (ev) => {
            divModalProgramer.style.display="none";
        }
        const br = document.createElement("hr");
        this.miniKontejner.appendChild(br);
        // this.programeri.forEach(programer => {
        //     programer.crtajProgramera(this.miniKontejner);
        // })
        const dugmePrikaziProgramere = document.createElement("button");
        dugmePrikaziProgramere.innerHTML="Prikazi programere";
        dugmePrikaziProgramere.classList.add("btn-primary");
        dugmePrikaziProgramere.classList.add("dugmePrikaziProgramere");
        this.miniKontejner.appendChild(dugmePrikaziProgramere);
        dugmePrikaziProgramere.onclick = (ev) => {
            this.vratiSveProgramere();
            dugmePrikaziProgramere.disabled=true;
            this.proveriStanjeDugmeta();
        }
    }
    proveriStanjeDugmeta(){
        const dugmePrik = this.miniKontejner.querySelector(".dugmePrikaziProgramere");
        const dugmeUnosProgramera=this.miniKontejner.querySelector(".dugmeDodajProgramera");
        if(dugmePrik.disabled==true){
            dugmeUnosProgramera.disabled=false;
        }
    }
    vratiSveProgramere(){
    
        fetch("https://localhost:5001/Programer/PreuzmiProgramere/"+this.id, {
    method: "GET"
     }).then(p => p.json().then(programeri =>
        programeri.forEach((programer)=> {
            const prog = new Programer(programer.id, programer.ime,programer.prezime,programer.starost,programer.senioritet,programer.plata);
            prog.crtajProgramera(this.miniKontejner);
        }))
 
     );
}
    dodajProgrameraNaProjekata(){
        const ime = this.miniKontejner.querySelector(".ime").value;
        const prezime = this.miniKontejner.querySelector(".prezime").value;
        const starost = this.miniKontejner.querySelector(".starost").value;
        const senioritet = this.miniKontejner.querySelector(".senioritet").value;
        const plata = this.miniKontejner.querySelector(".plata").value;
        this.proveriValidnostProgramera(ime,prezime,starost,senioritet,plata);
        fetch("https://localhost:5001/Programer/DodajProgrameraNaProjekat/" + this.id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "ime":ime,
                    "prezime": prezime,
                    "starost": starost,
                    "senioritet": senioritet,
                    "plata":plata
                })
            }).then(p => {
                if (p.ok) {
                    p.json().then(q => {
                        console.log(q);
                        let programer = new Programer(q,ime,prezime,starost,senioritet,plata);
                        programer.Projekat=this;
                        this.dodajProgramera(programer);
                        programer.crtajProgramera(this.miniKontejner);
                        console.log(this.programeri);
                    })
                    
                }
            }).catch(p => {
                alert("Doslo je do greske prilikom upisa");
            });

    }
    proveriValidnostProgramera(ime,prezime,starost,senioritet,plata){
        if(ime.length > 30 || ime.length==0){
            alert("Ime koje ste uneli nije validno!");
            return;
        }
        else if(prezime.length>30 || prezime.length==0){
            alert("Prezime koje ste uneli nije validno")
            return;
        }
        else if(starost<16 || starost>70){
            alert("Starost koju ste uneli nije validna");
            return;
        }
        else if(senioritet.length>20){
            alert("Senioritet koji ste uneli nije validan");
        }
        else if(plata<100 || plata>10000){
            alert("Plata koju ste uneli nije validna");
            return;
        }
        else {
            alert("Uspesno ste dodali programera na projekat");
            return;
        }
    }
    proveriValidnostProjekta(name,type,priority,duration)
     {  
        if(name.length > 50 || name.length == 0)
        {
            alert("Naziv ne moze biti duzi od 50 karaktera ili prazan");
        }
         
        if(type.length > 20 || type.length == 0)
        {
            alert("Tip ne moze biti duzi od 20 karaktera ili prazan");
        }
         
        if(priority.length > 20 || priority.length == 0)
        {
            alert("Prioritet ne moze biti duzi od 20 karaktera ili prazan");
        }
         
        if(duration.length > 50 || duration.length == 0)
        {
            alert("Ocekivano trajanje ne moze biti duze od 20 karaktera ili prazan");
        }
     }
    ocistiPrikazProgramera(){
        this.miniKontejner.querySelector(".ime").value="";
        this.miniKontejner.querySelector(".prezime").value="";
        this.miniKontejner.querySelector(".starost").value="";
        this.miniKontejner.querySelector(".senioritet").value="";
        this.miniKontejner.querySelector(".plata").value="";
    }
    izmeniProjekat(){

        const noviNaziv = this.miniKontejner.querySelector(".naziv").value;
        const noviTip = this.miniKontejner.querySelector(".tip").value;
        const noviPrioritet = this.miniKontejner.querySelector(".prioritet").value;
        const novoOcekivanoTrajanje = this.miniKontejner.querySelector(".ocekivanoTrajanje").value;
        this.proveriValidnostProjekta(noviNaziv,noviTip,noviPrioritet,novoOcekivanoTrajanje);
        
        //console.log(noviNaziv+" "+noviTip+" "+ noviPrioritet+" "+novoOcekivanoTrajanje);
        fetch("https://localhost:5001/Projekat/IzmeniProjekat/"+this.id+"/"+ noviNaziv +"/" + noviTip + "/" + noviPrioritet + "/"+ novoOcekivanoTrajanje, {
            method: "PUT"
        }).then(p => {
            if (p.ok) {
                this.naziv=noviNaziv;
                this.tip=noviTip;
                this.prioritet=noviPrioritet;
                this.ocekivanoTrajanje=novoOcekivanoTrajanje;
                this.miniKontejner.querySelector(".nazivIzmena").innerHTML="Naziv: " + this.naziv;
                this.miniKontejner.querySelector(".tipIzmena").innerHTML="Tip: "+ this.tip;
                this.miniKontejner.querySelector(".prioritetIzmena").innerHTML="Prioritet: " + this.prioritet;
                this.miniKontejner.querySelector(".ocekivanoTrajanjeIzmena").innerHTML="Ocekivano trajanje: "+ this.ocekivanoTrajanje;
                this.miniKontejner.querySelector(".naslovKartice").innerHTML=this.naziv;
                this.miniKontejner.style.backgroundColor=this.bojaNaOsnovuPrioriteta();
                
            }
        });
       
    }
    obrisiProjekat(){
        
        fetch("https://localhost:5001/Projekat/ObrisiProjekat/" + this.id, {
            method: "DELETE"
        }).then(p => {
            if (p.ok) {
                this.miniKontejner.style.display="none";
            }
        });  
    }
    
}