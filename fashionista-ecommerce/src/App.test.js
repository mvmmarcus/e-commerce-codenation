import React from "react";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import CartProduct from "./components/CartProduct";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ImgModal from "./components/ImgModal";
import Loading from "./components/Loading";
import Product from "./components/Product/Product";
import SearchProduct from "./components/SearchProduct";
import SelectedProduct from "./components/SelectedProduct";

const history = createMemoryHistory();

describe("Fashionista E-commerce tests", () => {
  describe("Folder structure and data-testid attributes", () => {
    it("should render properly the <CartProduct/> component", () => {
      const propsMock = {
        item: {
          product: {
            image: "",
          },
        },
      };
      const { getByTestId } = render(
        <Provider store={store}>
          <Router history={history}>
            <CartProduct {...propsMock} />
          </Router>
        </Provider>
      );
      const container = getByTestId("cart-product");
      expect(container).toBeDefined();
    });

    it("should should render properly the <Footer/> component", () => {
      const { getByTestId } = render(<Footer />);
      const container = getByTestId("footer");

      expect(container).toBeDefined();
    });

    it("should render properly the <Header/> component", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <Router history={history}>
            <Header />
          </Router>
        </Provider>
      );
      const container = getByTestId("header");

      expect(container).toBeDefined();
    });

    it("should render properly the <ImgModal/> component", () => {
      const propsMock = {
        item: {
          image: "",
        },
      };

      const { getByTestId } = render(
        <Provider store={store}>
          <Router history={history}>
            <ImgModal {...propsMock} />
          </Router>
        </Provider>
      );
      const container = getByTestId("img-modal");

      expect(container).toBeDefined();
    });

    it("should should render properly the <Loading/> component", () => {
      const { getByTestId } = render(<Loading />);
      const container = getByTestId("loading");

      expect(container).toBeDefined();
    });

    it("should should render properly the <Product/> component", () => {
      const propsMock = {
        item: {
          id: "",
        },
      };

      const { getByTestId } = render(
        <Router history={history} >
          <Product {...propsMock} />
        </Router>
      );
      const container = getByTestId("product");

      expect(container).toBeDefined();
    });

    it("should render properly the <SearchProduct/> component", () => {
      
      const propsMock = {
        item: {
          image: "",
        },
      };
      const { getByTestId } = render(
        <Provider store={store}>
          <Router history={history}>
            <SearchProduct {...propsMock} />
          </Router>
        </Provider>
      );
      const container = getByTestId("search-product");

      expect(container).toBeDefined();
    });

    it("should render properly the <SelectedProduct/> component", () => {
      
      const propsMock = {
        item: {
          image: "",
        },
      };

      const { getByTestId } = render(
        <Provider store={store}>
          <Router history={history}>
            <SelectedProduct {...propsMock} />
          </Router>
        </Provider>
      );
      const container = getByTestId("selected-product");

      expect(container).toBeDefined();
    });
  });
});
