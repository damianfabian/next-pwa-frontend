import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import store, { initStore, StoreType } from 'store';
import { Provider } from 'react-redux';



type TestProviderProps = {
	store: StoreType;
	children: React.ReactElement;
};

interface RenderOptsProps extends RenderOptions {
	store: StoreType;
};

const TestProvider = ({ store, children }: TestProviderProps) => (
	<Provider store={store}>{children}</Provider>
);

export function testRender(ui : React.ReactElement, { store, ...otherOpts } : RenderOptsProps) {
	return render(<TestProvider store={store}>{ui}</TestProvider>, otherOpts);
}

export function mockStore() {
	return initStore();
}
