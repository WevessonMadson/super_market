# Diagrama para base de dados

Entidades: Lista, Produto, Categoria

Lista {
id Int PrimaryKey autoincrement
nome String unique
Selected Boolean
}

Produto {
id Int PrimaryKey autoincrement
nome String unique
catergoria Int foreing key
}

Categoria {
id Int PrimaryKey autoincrement
nome String unique
}

ProdutoLista {
idLista Int
idProduto Int
quantidade Double
preco Double
checked Boolean default false
}
