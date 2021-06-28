import builder from 'xmlbuilder';

interface IParse {
  nome: string;
  codigo: number;
  descricao: string;
  vlr_unit: number;
}
export default function xmlParse({
  nome,
  codigo,
  descricao,
  vlr_unit,
}: IParse): string {
  const pedido = {
    pedido: {
      cliente: {
        nome,
      },
      itens: {
        item: {
          codigo,
          descricao,
          qtde: 1,
          vlr_unit,
        },
      },
    },
  };
  const xml = builder.create(pedido).end({ pretty: true });

  return xml;
}
