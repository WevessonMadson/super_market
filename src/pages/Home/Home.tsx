import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { usePageTitle } from "../../contexts/PageTitleContext";
import { useSettings } from "../../contexts/SetingsContext";
import { useMenu } from "../../contexts/MenuContext";
import SubMenu from "../../components/SubMenuLists/SubMenu";

import IconShoppingCart from "../../assets/icons/shopping_cart_icon.svg";
import IconFilterCart from "../../assets/icons/filter_alt_icon.svg";
import IconDelete from "../../assets/icons/delete_icon.svg";
import IconCloseFilter from "../../assets/icons/close_icon.svg";
import { useLists } from "../../contexts/ListsContext";

type ProductType = {
  idLista: number;
  nome: string;
  quantidade: number;
  preco: number;
  checked: boolean;
};

export type StateType = {
  listProducts: ProductType[];
  total: number;
};

export default function Home() {
  const { setTitle } = usePageTitle();
  const { originalConfig } = useSettings();
  const { isSubMenuOpen, toggleSubMenu } = useMenu();
  const { listOfLists } = useLists();

  const inputDescricao = useRef<HTMLInputElement>(null);

  const [stateList, setStateList] = useState<StateType>({
    listProducts: [],
    total: 0,
  });

  const [productDataForm, setProductDataForm] = useState({
    descricao: "",
    quantidade: 1,
    preco: 0,
  });

  const selectContent = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const calculateTotalList = (listOfProducts: ProductType[]): number => {
    let total = 0;

    listOfProducts.forEach(({ preco, quantidade, checked }: ProductType) => {
      if (originalConfig.sumOnlyChecked) {
        if (checked) {
          total += quantidade * preco;
        }
      } else {
        total += quantidade * preco;
      }
    });

    return total;
  };

  function orderByChecked(listaDeProdutos: ProductType[]) {
    const check: ProductType[] = [];
    const noCheck: ProductType[] = [];

    listaDeProdutos.forEach((produto: ProductType) => {
      if (produto.checked) {
        check.push(produto);
      } else {
        noCheck.push(produto);
      }
    });

    return noCheck.concat(check);
  }

  function addProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let { descricao, quantidade, preco } = productDataForm;
    const listProducts = stateList.listProducts;

    if (descricao.trim() === "") {
      alert("É necessário preencher a descrição.");
      inputDescricao.current?.focus();
      return;
    }

    if (quantidade === 0) quantidade = 1;

    listProducts.push({
      nome: descricao,
      quantidade,
      preco,
      checked: false,
      idLista: listOfLists[0].id,
    });

    let total = calculateTotalList(listProducts);
    setStateList({ ...stateList, listProducts, total });

    localStorage.setItem(
      listOfLists[0].nome,
      JSON.stringify(stateList.listProducts)
    );

    // closeFiltro();

    setProductDataForm({ descricao: "", quantidade: 1, preco: 0 });
    inputDescricao.current?.focus();
  }

  function deleteProduct(index: number) {
    if (
      confirm(
        `Confirma a exclusão do produto: "${stateList.listProducts[index].nome}"?`
      )
    ) {
      const listProducts = stateList.listProducts.filter(
        (_, indiceProduto) => indiceProduto !== index
      );

      let total = calculateTotalList(listProducts);
      setStateList({ ...stateList, listProducts, total });
      localStorage.setItem(listOfLists[0].nome, JSON.stringify(listProducts));
    }
  }

  function reorganizar(index: number) {
    let listProducts = stateList.listProducts;
    listProducts[index].checked = !listProducts[index].checked;

    listProducts = orderByChecked(listProducts);

    let total = calculateTotalList(listProducts);

    setStateList({ ...stateList, listProducts, total });
    localStorage.setItem(listOfLists[0].nome, JSON.stringify(listProducts));
  }

  function atualizaSubtotalProduto(
    index: number,
    campo: "quantidade" | "preco",
    valor: number
  ): void {
    let listProducts = stateList.listProducts;
    listProducts[index][campo] = valor;

    let total = calculateTotalList(listProducts);

    setStateList({ ...stateList, listProducts, total });
  }

  function openFiltro() {
    // let filtro = document.querySelector("#filtro");
    // let textoFiltro = document.querySelector("#texto-filtro");
    // document.querySelector("#descricao-table")!.style.display = "flex";
    // filtro.style.display = "flex";
    // textoFiltro.current?.focus();
  }

  function realizaFiltroNosProdutos(): void {
    throw new Error("Function not implemented.");
  }

  function closeFiltro(): void {
    throw new Error("Function not implemented.");
  }

  useEffect(() => {
    setTitle("Home");
  }, [setTitle]);

  useEffect(() => {
    const listProducts = JSON.parse(
      localStorage.getItem(listOfLists[0].nome) || "[]"
    );
    if (listProducts.length) {
      let total = calculateTotalList(listProducts);
      setStateList({ listProducts, total });
    }
  }, [listOfLists]);

  return (
    <>
      {isSubMenuOpen && <SubMenu onClose={toggleSubMenu} />}
      <div id="app">
        <form onSubmit={addProduct}>
          <div id="formDataCad">
            <div id="labelCad">
              <label htmlFor="descricao">Descrição:</label>
              <label htmlFor="quantidade">Quantidade:</label>
              <label htmlFor="preco">Preço Unit.:</label>
            </div>
            <div id="inputsCad">
              <input
                type="text"
                id="descricao"
                placeholder="Ex.: Arroz"
                value={productDataForm.descricao}
                onFocus={selectContent}
                onChange={(e) =>
                  setProductDataForm({
                    ...productDataForm,
                    descricao: e.target.value,
                  })
                }
                ref={inputDescricao}
              />
              <input
                type="number"
                id="quantidade"
                step="0.001"
                value={productDataForm.quantidade}
                onFocus={selectContent}
                onChange={(e) =>
                  setProductDataForm({
                    ...productDataForm,
                    quantidade: Number(e.target.value),
                  })
                }
              />
              <input
                type="number"
                id="preco"
                step="0.01"
                value={productDataForm.preco}
                onFocus={selectContent}
                onChange={(e) =>
                  setProductDataForm({
                    ...productDataForm,
                    preco: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <button id="adicionar" className="btnAction">
                Adicionar
              </button>
            </div>
          </div>
        </form>
        <div id="totalCarr">
          <p>
            Valor total:{" "}
            <span id="totLista">
              R${" "}
              <span id="valTotCar">
                {stateList.total.toFixed(2).replace(".", ",")}
              </span>
            </span>
          </p>
        </div>
        <div id="container">
          <table>
            <thead>
              <tr>
                <th>
                  <img src={IconShoppingCart} />
                </th>
                <th id="descricao-table">
                  Descrição
                  <img
                    id="icone-filtro"
                    onClick={openFiltro}
                    src={IconFilterCart}
                  />
                  <div id="filtro">
                    <input
                      type="text"
                      placeholder="produto..."
                      id="texto-filtro"
                      onInput={realizaFiltroNosProdutos}
                      onFocus={selectContent}
                    />
                    <button onClick={closeFiltro}>
                      <img src={IconCloseFilter} />
                    </button>
                  </div>
                </th>
                <th>Qtd</th>
                <th>Preço</th>
                <th>Subtotal</th>
                <th id="acao">Ação</th>
              </tr>
            </thead>
            <tbody id="tbody">
              {stateList.listProducts.length > 0 &&
                stateList.listProducts.map(
                  (
                    { nome, quantidade, preco, checked }: ProductType,
                    index
                  ) => (
                    <tr className="trTableValue" key={index}>
                      <td>
                        <input
                          type="checkbox"
                          onChange={() => reorganizar(index)}
                          checked={checked}
                        />
                      </td>
                      <td className="descProd ">{nome}</td>
                      <td>
                        <input
                          type="number"
                          onFocus={selectContent}
                          onChange={(e) =>
                            atualizaSubtotalProduto(
                              index,
                              "quantidade",
                              Number(e.target.value)
                            )
                          }
                          className="inputQtd"
                          value={quantidade}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          onFocus={selectContent}
                          onChange={(e) =>
                            atualizaSubtotalProduto(
                              index,
                              "preco",
                              Number(e.target.value)
                            )
                          }
                          className="inputPreco"
                          value={preco}
                        />
                      </td>
                      <td className="total">
                        {(quantidade * preco).toFixed(2).replace(".", ",")}
                      </td>
                      <td
                        className="action"
                        onClick={() => deleteProduct(index)}
                      >
                        <img src={IconDelete} />
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
