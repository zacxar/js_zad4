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
        wiek += ' rok';
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
    this.lista = {};
  }

  wypiszProdukt(idProduktu) {}

  wypiszWszystkieProdukty() {}

  dodajProdukt(produkt) {}

  zmienProdukt(idProduktu, produkt) {}
}

class Magazyn extends ListaTowarow {}

class Sklep extends ListaTowarow {}
