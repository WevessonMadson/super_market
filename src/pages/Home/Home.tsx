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
import ModalClearProducts from "../../components/ModalClearProducts/ModalClearProducts";

export type ProductType = {
  id: number;
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
  const [isModalClearOpen, setIsModalClearOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterText, setFilterText] = useState("");

  const inputDescricao = useRef<HTMLInputElement>(null);
  const inputFilterRef = useRef<HTMLInputElement>(null);

  const [stateList, setStateList] = useState<StateType>({
    listProducts: [],
    total: 0,
  });

  const [productDataForm, setProductDataForm] = useState({
    descricao: "",
    quantidade: "1",
    preco: "0",
  });

  const toggleModalClear = () => {
    setIsModalClearOpen((prev) => !prev);
  };

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

  function lastIdProduct(listProducts: ProductType[]) {
    let lastId = 0;
    if (listProducts.length > 0) {
      listProducts.forEach((produto) => {
        if (produto.id > lastId) lastId = produto.id;
      });
    }

    return lastId;
  }

  function addProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let descricao = productDataForm.descricao.trim();
    let quantidade = Number(productDataForm.quantidade);
    let preco = Number(productDataForm.preco);

    const listProducts: ProductType[] = JSON.parse(
      localStorage.getItem(listOfLists[0].nome) || "[]"
    );

    if (descricao === "") {
      alert("É necessário preencher a descrição.");
      inputDescricao.current?.focus();
      return;
    }

    if (quantidade === 0) quantidade = 1;

    listProducts.push({
      id: lastIdProduct(listProducts) + 1,
      nome: descricao,
      quantidade,
      preco,
      checked: false,
    });

    localStorage.setItem(listOfLists[0].nome, JSON.stringify(listProducts));

    let total = calculateTotalList(listProducts);
    setStateList({ ...stateList, listProducts, total });

    closeFilter();
    setProductDataForm({ descricao: "", quantidade: "1", preco: "0" });
    inputDescricao.current?.focus();
  }

  function deleteProduct(id: number, nomeProduto: string) {
    if (confirm(`Confirma a exclusão do produto: "${nomeProduto}"?`)) {
      const listProducts: ProductType[] = JSON.parse(
        localStorage.getItem(listOfLists[0].nome) || "[]"
      );

      const newListProducts = listProducts.filter(
        (produto) => produto.id !== id
      );

      let total = calculateTotalList(newListProducts);
      setStateList({
        ...stateList,
        listProducts:
          isFilterOpen && filterText.length > 2
            ? filterProducts(newListProducts)
            : newListProducts,
        total,
      });
      localStorage.setItem(
        listOfLists[0].nome,
        JSON.stringify(newListProducts)
      );
    }
  }

  function reorganizar(id: number) {
    const listProducts: ProductType[] = JSON.parse(
      localStorage.getItem(listOfLists[0].nome) || "[]"
    );

    const newListProducts = orderByChecked(
      listProducts.map((produto) => {
        if (produto.id === id) produto.checked = !produto.checked;

        return produto;
      })
    );

    let total = calculateTotalList(newListProducts);

    setStateList({
      ...stateList,
      listProducts:
        isFilterOpen && filterText.length > 2
          ? filterProducts(newListProducts)
          : newListProducts,
      total,
    });

    localStorage.setItem(listOfLists[0].nome, JSON.stringify(newListProducts));
  }

  function atualizaSubtotalProduto(
    id: number,
    campo: "quantidade" | "preco",
    valor: number
  ): void {
    const listProducts: ProductType[] = JSON.parse(
      localStorage.getItem(listOfLists[0].nome) || "[]"
    );

    const newListProducts = listProducts.map((produto) => {
      if (produto.id === id) produto[campo] = valor;
      return produto;
    });

    let total = calculateTotalList(newListProducts);

    setStateList({
      ...stateList,
      listProducts:
        isFilterOpen && filterText.length > 2
          ? filterProducts(newListProducts)
          : newListProducts,
      total,
    });
    localStorage.setItem(listOfLists[0].nome, JSON.stringify(listProducts));
  }

  function openFilter() {
    setIsFilterOpen(true);

    setTimeout(() => {
      inputFilterRef.current?.focus();
    }, 50);
  }

  function closeFilter(): void {
    setFilterText("");
    setIsFilterOpen(false);
  }

  function filterProducts(listProducts: ProductType[]): ProductType[] {
    return listProducts.filter((produto) =>
      produto.nome
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(
          filterText
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
        )
    );
  }

  function realizaFiltroNosProdutos(): void {
    const allProducts: ProductType[] = JSON.parse(
      localStorage.getItem(listOfLists[0].nome) || "[]"
    );

    const total = allProducts.length > 0 ? calculateTotalList(allProducts) : 0;

    if (filterText.length > 2) {
      const productsFilters = filterProducts(allProducts);
      setStateList({ listProducts: productsFilters, total });
    } else if (filterText.length == 0) {
      setStateList({ listProducts: allProducts, total });
    }
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
    } else {
      setStateList({ listProducts: [], total: 0 });
    }
    closeFilter();
  }, [listOfLists]);

  useEffect(realizaFiltroNosProdutos, [filterText]);

  return (
    <>
      {isSubMenuOpen && (
        <SubMenu onClose={toggleSubMenu} openModalClear={toggleModalClear} />
      )}
      {isModalClearOpen && <ModalClearProducts onClose={toggleModalClear} />}
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
                onChange={(e) => {
                  const val = e.target.value;

                  // Evita "0" automático quando apaga
                  if (val === "") {
                    setProductDataForm({ ...productDataForm, quantidade: "" });
                    return;
                  }

                  // Se digitar ponto final, ignora
                  if (val.endsWith(".")) {
                    return;
                  }

                  setProductDataForm({
                    ...productDataForm,
                    quantidade: val,
                  });
                }}
              />
              <input
                type="number"
                id="preco"
                step="0.01"
                value={productDataForm.preco}
                onFocus={selectContent}
                onChange={(e) => {
                  const val = e.target.value;

                  if (val === "") {
                    setProductDataForm({ ...productDataForm, preco: "" });
                    return;
                  }

                  if (val.endsWith(".")) {
                    return;
                  }

                  setProductDataForm({
                    ...productDataForm,
                    preco: val,
                  });
                }}
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
                    onClick={openFilter}
                    src={IconFilterCart}
                  />
                  {isFilterOpen && (
                    <div id="filtro">
                      <input
                        ref={inputFilterRef}
                        type="text"
                        placeholder="produto..."
                        id="texto-filtro"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        onFocus={selectContent}
                      />
                      <button onClick={closeFilter}>
                        <img src={IconCloseFilter} />
                      </button>
                    </div>
                  )}
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
                  ({ id, nome, quantidade, preco, checked }: ProductType) => (
                    <tr className="trTableValue" key={id}>
                      <td>
                        <input
                          type="checkbox"
                          onChange={() => reorganizar(id)}
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
                              id,
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
                              id,
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
                        onClick={() => deleteProduct(id, nome)}
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
