import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IProduct from '../interfaces/product.interface';
import { products } from '../(data)/data';
import uuid from 'react-native-uuid';

const FormProductScreen = () => {
	const router = useRouter();
	const parameters = useLocalSearchParams();
	const [tfName, setTfName] = useState('');
	const [tfDescription, setTfDescription] = useState('');
	const [tfPrice, setTfPrice] = useState('');

	const onSave = () => {
		const newProduct: IProduct = {
			id: uuid.v4().toString(),
			name: tfName,
			description: tfDescription,
			price: Number(tfPrice),
		};
		products.push(newProduct);
	};

	const onUpdate = () => {
		const index = products.findIndex((product) => product.id === parameters.id);
		const updateProduct = products[index];
		updateProduct.name = tfName;
		updateProduct.description = tfDescription;
		updateProduct.price = Number(tfPrice);
		products[index] = updateProduct;
	};
	
	const onHandleForm = () => {
		if (parameters.id != '') {
			onUpdate();
		} else {
			onSave();
		}
		router.back();
	};
	const init = () => {
		if (parameters.id != '') {
			const product: IProduct | undefined = products.find(
				(product) => product.id === parameters.id
			);
			setTfName(product!.name);
			setTfDescription(product!.description);
			setTfPrice(product!.price.toString());
		}
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<View className="p-2 bg-gray-950 h-screen">
			<Ionicons
				onPress={() => {
					router.back();
				}}
				color={'white'}
				size={30}
				name="chevron-back-outline"
			></Ionicons>
			<Text className="text-white font-bold text-2xl my-4">
				{parameters.id != '' ? 'Editar Producto' : 'Crear Producto'}
			</Text>
			<TextInput
				className="rounded-md p-3 bg-gray-200 mb-4"
				onChangeText={setTfName}
				value={tfName}
				placeholder="Nombre"
			></TextInput>

			<TextInput
				className="rounded-md p-3 bg-gray-200 mb-4"
				onChangeText={setTfDescription}
				value={tfDescription}
				placeholder="Descripción"
			></TextInput>
			<TextInput
				className="rounded-md p-3 bg-gray-200 mb-6"
				onChangeText={setTfPrice}
				value={tfPrice}
				placeholder="Precio"
			></TextInput>
			<TouchableOpacity
				onPress={onHandleForm}
				className="bg-yellow-500 rounded-md p-4"
			>
				<Text className="text-black font-semibold text-center">Guardar</Text>
			</TouchableOpacity>
		</View>
	);
};

export default FormProductScreen;
