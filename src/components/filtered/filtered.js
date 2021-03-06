import React, {PureComponent} from 'react'
import { ShoppingBasketContext } from '../shoppingBasketProvider/shoppingBasketProvider.js';
import style from './filtered.module.scss';
import { BrowserRouter, Switch, Route, Redirect, NavLink, Link } from "react-router-dom";
import ProductСard from '../../page/productСard/productСard.js'

export default class Filtered extends PureComponent {
  render() {
    // рендерим все айтемы и пакуем в переменную
    let {search, filters, items, sort} = this.props

    if (search.length !== 0) {
      items = items.filter(word =>
        word.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
      )
    }

    if (filters.length !== 0) {
      items = items.filter(element => filters.every(key => element[key]));
    }

    // сортировка
    (function(){
      if (sort === "cheap to expensive")
        items.sort((a, b) => parseInt(a.price) - parseInt(b.price));

      if (sort === "expensive to cheap")
        items.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    })();

    const result = items.map((item, i) => {
      return (
        <div className="card" key={i} className={style.item}>
          <div className={style.image}><img className="card-img-top image" src={item.img}  alt={item.name}></img></div>
          <h4 className="card-title"><Link to={`/products/${item.id}`}>{item.name}</Link></h4>
          <div className="card-body" className={style.body}>
            <p className="card-text">{item.components}</p>
            <p className="card-text"><b>Масса:</b> <span>{item.mass}</span></p>
            <p className="card-text"><b>Цена:</b> <span>{item.price}</span></p>
            <ShoppingBasketContext.Consumer>
              {( {addToCard} ) => (
                <button className="btn btn-primary" onClick={() => {addToCard(item.name, item.price)}} >Заказать</button>
              )}
            </ShoppingBasketContext.Consumer>
          </div>
        </div>
      )
    })

    return (
      <div className="content">{result}</div>
    )
  }
}
