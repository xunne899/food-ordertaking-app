import { Center, Spinner } from "@chakra-ui/react";
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ICategory, IItem, ILine, IOrder, IRestaurant } from "../models";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db, auth, functions } from "../utils/firebase";
import { signInAnonymously } from "firebase/auth";
import { httpsCallable } from "firebase/functions";

interface IDataProviderContext {
  lines: ILine[];
  restaurantInfo?: IRestaurant;
  categories: ICategory[];
  items: IItem[];
  order?: IOrder;
  getItemsCategory: (category: string) => IItem[];
  getItemById: (itemId: string) => IItem | undefined;
  addToCart: (line: ILine) => void;
  removeCartItem: (index: number) => void;
  checkout: (draftOrder: IOrder) => Promise<string>;
}

export const DataProviderContext = createContext<IDataProviderContext>({
  lines: [],
  categories: [],
  items: [],
  getItemsCategory: () => [],
  getItemById: () => undefined,
  addToCart: () => {},
  removeCartItem: () => {},
  checkout: () => Promise.resolve(""),
});

export const useDataProvider = () => useContext(DataProviderContext);

export const DataProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState<IRestaurant>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [items, setItems] = useState<IItem[]>([]);
  const [lines, setLines] = useState<ILine[]>([]);
  const [order, setOrder] = useState<IOrder>();

  const fetchCategories = async () => {
    const categoriesSnapshot = await getDocs(collection(db, "category"));
    const dbCategories: ICategory[] = [];
    categoriesSnapshot.forEach((category) =>
      dbCategories.push(category.data() as ICategory)
    );
    setCategories(dbCategories);
  };

  const fetchItems = async () => {
    const itemsSnapshot = await getDocs(collection(db, "item"));
    const dbItems: IItem[] = [];
    itemsSnapshot.forEach((item) => dbItems.push(item.data() as IItem));
    setItems(dbItems);
  };

  const fetchRestaurantInfo = async () => {
    const restaurantInfoSnapshot = await getDoc(doc(db, "restaurant", "info"));
    setRestaurantInfo(restaurantInfoSnapshot.data() as IRestaurant);
  };

  const fetchData = async () => {
    await signInAnonymously(auth);
    await fetchItems();
    await fetchCategories();
    await fetchRestaurantInfo();
    setIsReady(true);
  };

  const getItemById = (itemId: string) => {
    return items.find((item) => item.id === itemId);
  };

  const getItemsCategory = (category: string): IItem[] => {
    return items.filter((item) => item.category === category);
  };

  const addToCart = (line: ILine) => {
    setLines([...lines, line]);
  };

  const removeCartItem = (itemIndex: number) => {
    setLines(lines.filter((_, index) => index !== itemIndex));

    console.log("Removed item at index:", itemIndex);
  };

  console.log(lines);

  const checkout = async (order: IOrder) => {
    const placeorder = httpsCallable<IOrder, { id: string; order: IOrder }>(
      functions,
      "placeorder"
    );

    const { data } = await placeorder({ ...order, lines });
    setLines([]);
    setOrder(data.order);
    onSnapshot(doc(db,'order',data.id),(docSnapshot)=>{
   setOrder(docSnapshot.data() as IOrder)
    })
    return data.id;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataProviderContext.Provider
      value={{
        lines,
        restaurantInfo,
        categories,
        items,
        getItemsCategory,
        getItemById,
        addToCart,
        removeCartItem,
        checkout,
        order,
      }}
    >
      {isReady ? (
        children
      ) : (
        <Center height="100vh">
          <Spinner />
        </Center>
      )}
    </DataProviderContext.Provider>
  );
};
