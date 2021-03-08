import React from 'react';
import renderer from 'react-test-renderer';
import SigIn from './SignIn';

it('render correctly', () => {
    const tree = renderer.create(<SigIn/>);

    expect(tree).toMatchSnapshot();
})