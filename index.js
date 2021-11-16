var kosztEnergii = 6.75;

class Produkt {
  constructor(id, nazwa, model, rok, cena, zuzycie) {
    this.id = id;
    this.nazwa = nazwa;
    this.model = model;
    this.rok = rok;
    this.cena = cena;
    this.zuzycie = zuzycie;
  }

  clone() {
    return new Produkt(
      this.id,
      this.nazwa,
      this.model,
      this.rok,
      this.cena,
      this.zuzycie
    );
  }

  koszt() {
    return this.cena;
  }

  kosztEnergii() {
    return this.zuzycie * kosztEnergii;
  }

  wiekProduktu() {
    let date = new Date();
    date = date.getFullYear();
    return date - this.rok;
  }

  wiekProduktuLata() {
    let wiek = this.wiekProduktu();

    switch (wiek % 10) {
      case 1:
        if (wiek < 10) wiek += ' rok';
        else wiek += ' lat';
        break;
      case 2:
        wiek += ' lata';
        break;
      case 3:
        wiek += ' lata';
        break;
      case 4:
        wiek += ' lata';
        break;
      default:
        wiek += ' lat';
        break;
    }

    return wiek;
  }
}

class ListaTowarow {
  constructor() {
    this.lista = new Array();
  }

  wypiszProdukt(idProduktu) {
    let id = this.lista.findIndex((x) => x.id === idProduktu);

    if (id < 0) throw 'Na liście nie ma produktu o podanym id!';
    else {
      console.log('\nid = ' + this.lista[id].id);
      console.log('nazwa: ' + this.lista[id].nazwa);
      console.log('model: ' + this.lista[id].model);
      console.log('rok produkcji: ' + this.lista[id].rok);
      console.log('cena: ' + this.lista[id].cena);
      console.log('zużycie energii: ' + this.lista[id].zuzycie);
    }
  }

  wypiszWszystkieProdukty() {
    this.lista.forEach((element) => {
      this.wypiszProdukt(element.id);
    });
  }

  dodajProdukt(produkt) {
    if (this.lista.findIndex((x) => x.id === produkt.id) < 0) {
      this.lista.push(produkt);
    } else {
      throw 'Produkt o podanym id znajduje się już na liście!';
    }
  }

  zmienProdukt(idProduktu, produkt) {
    let id = this.lista.findIndex((x) => x.id === idProduktu);

    if (id < 0) {
      throw 'Na liście nie ma produktu o podanym id:' + idProduktu;
    } else {
      this.lista[id].nazwa = produkt.nazwa;
      this.lista[id].model = produkt.model;
      this.lista[id].rok = produkt.rok;
      this.lista[id].cena = produkt.cena;
      this.lista[id].zuzycie = produkt.zuzycie;
    }
  }
}

class Magazyn extends ListaTowarow {
  constructor() {
    super();
  }

  dodajProdukt(produkt, ilosc) {
    if (this.lista.findIndex((x) => x.id === produkt.id) < 0) {
      produkt['ilosc'] = ilosc;
      this.lista.push(produkt);
    } else {
      throw 'Produkt o podanym id znajduje się już na liście!';
    }
  }

  wypiszProdukt(idProduktu) {
    super.wypiszProdukt(idProduktu);
    let id = this.lista.findIndex((x) => x.id === idProduktu);
    console.log('ilosc: ' + this.lista[id].ilosc);
  }

  zabierzProdukt(idProduktu, ile) {
    let id = this.lista.findIndex((x) => x.id === idProduktu);

    if (this.lista[id].ilosc < ile) {
      console.log(
        'W magazynie jest za mała ilość produktu ' +
          this.lista[id].nazwa +
          ' (' +
          this.lista[id].ilosc +
          ')!'
      );
    } else {
      this.lista[id].ilosc -= ile;
      let pr = this.lista[id].clone();
      pr['ilosc'] = ile;
      return pr;
    }
  }
}

class Sklep extends ListaTowarow {
  dodajProdukt(nazwa, model, cena, rok, zuzycieEnergii) {}

  dodajProdukt(idProduktu, nazwa, model, cena, rok, zuzycieEnergii) {
    if (this.lista.findIndex((x) => x.id === idProduktu) < 0) {
      this.lista.push(
        new Produkt(idProduktu, nazwa, model, rok, cena, zuzycieEnergii)
      );
    } else {
      throw 'Produkt o podanym id znajduje się już na liście!';
    }
  }
}

let p1 = new Produkt(0, 'pila', 'stihl', 2000, 245, 120);
let p2 = new Produkt(1, 'siekiera', 'bosh', 2015, 75, 0);

// let lis = new ListaTowarow();
// lis.dodajProdukt(p2);
// lis.wypiszProdukt(0);

let mag = new Magazyn();
mag.dodajProdukt(p2, 5);
mag.dodajProdukt(p1, 10);
mag.wypiszWszystkieProdukty();

mag.zabierzProdukt(0, 5);
mag.wypiszWszystkieProdukty();
