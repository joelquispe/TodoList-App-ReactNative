import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { products } from './(data)/data';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link, useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useState } from 'react';
const HomeScreen = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const onDelete = (id: string) => {
		setIsLoading(true);
		setTimeout(() => {
			const index = products.findIndex((product) => product.id === id);
			products.splice(index, 1);
			
			setIsLoading(false);
			Toast.show({
				type: 'success',
				text1: 'Producto eliminado',
				position: 'bottom',
				visibilityTime: 2000,
				// text2: 'This is some something 👋'
			});
		}, 2000);
	};

	if (isLoading) {
		return (
			<View className="bg-gray-950 h-screen flex justify-center items-center">
				<Text className="text-white font-bold text-lg">Eliminando..</Text>
			</View>
		);
	}
	return (
		<View className="h-screen bg-gray-950 p-3 relative">
			<Toast />
			<View
				onTouchEnd={() => {
					router.push({ pathname: '/formProduct', params: { id: '' } });
				}}
				className="z-10 shadow-2xl rounded-lg absolute bottom-11 right-7 w-[40px] h-[40px] bg-white flex justify-center items-center "
			>
				<Icon size={25} name="plus"></Icon>
			</View>
			<ScrollView>
				{products.map((product, index) => {
					return (
						<TouchableOpacity
							onPress={() =>
								router.push({
									pathname: '/formProduct',
									params: { id: product.id },
								})
							}
							className="w-full bg-gray-200 rounded-md p-4 mb-3 flex flex-row justify-between items-center"
							key={index}
						>
							<View>
								<Text className="text-black font-bold text-md">
									{product.name}
								</Text>
								<Text className="text-black text-sm">
									Precio: {product.price}
								</Text>
							</View>
							<Icon
								size={20}
								className="z-50"
								name="trash"
								onPress={() => onDelete(product.id)}
							></Icon>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default HomeScreen;
