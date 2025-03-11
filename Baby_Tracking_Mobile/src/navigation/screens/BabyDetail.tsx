import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { useTypedRoute } from '../../services/hooks/useTypeRoute';

const predictNextValues = (data: number[], numPredictions: number) => {
    const n = data.length;
    const sumX = (n * (n + 1)) / 2;
    const sumY = data.reduce((a, b) => a + b, 0);
    const sumXY = data.reduce((sum, y, i) => sum + (i + 1) * y, 0);
    const sumX2 = (n * (n + 1) * (2 * n + 1)) / 6;

    const a = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const b = (sumY - a * sumX) / n;

    const predictions = [];
    for (let i = 1; i <= numPredictions; i++) {
        predictions.push(a * (n + i) + b);
    }
    return predictions;
};

const bmiData = [
    { name: "Gầy", population: 10, color: "#ff6384", legendFontColor: "#7F7F7F", legendFontSize: 12 },
    { name: "Bình thường", population: 60, color: "#36a2eb", legendFontColor: "#7F7F7F", legendFontSize: 12 },
    { name: "Thừa cân", population: 20, color: "#ffcd56", legendFontColor: "#7F7F7F", legendFontSize: 12 },
    { name: "Béo phì", population: 10, color: "#4bc0c0", legendFontColor: "#7F7F7F", legendFontSize: 12 },
];

const BabyDetail = () => {

    const route = useTypedRoute("BabyDetail");
    const { baby } = route.params;
    const weightData = [3.2, 4.1, 5.0, 5.8, 6.5, 7.2];

    const predictedWeights = predictNextValues(weightData, 3);

    const allData = [...weightData, ...predictedWeights];

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 110 }} style={{ padding: 10 }}>
            {/* Biểu đồ tăng trưởng */}
            <Card style={{ marginTop: 10, padding: 10 }}>
                <Text variant="titleMedium" style={{ marginBottom: 10 }}>Dự đoán tăng trưởng</Text>
                <LineChart
                    data={{
                        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9"],
                        datasets: [
                            {
                                data: allData,
                                color: (opacity = 1) => `rgba(139, 95, 191, ${opacity})`,
                                strokeWidth: 2
                            },
                            {
                                data: predictedWeights,
                                color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
                                strokeWidth: 2,
                                withDots: true
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width - 40}
                    height={220}
                    yAxisSuffix=" kg"
                    chartConfig={{
                        backgroundGradientFrom: "#ffffff",
                        backgroundGradientTo: "#ffffff",
                        decimalPlaces: 1,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        propsForDots: {
                            r: "5",
                            strokeWidth: "2",
                            stroke: "#8b5fbf"
                        }
                    }}
                    bezier
                    style={{ marginVertical: 10, borderRadius: 16 }}
                />
            </Card>

            {/* Biểu đồ BMI */}
            <Card style={{ marginTop: 10, padding: 10 }}>
                <Text variant="titleMedium" style={{ marginBottom: 10 }}>Tỷ lệ BMI</Text>
                <PieChart
                    data={bmiData}
                    width={Dimensions.get("window").width - 40}
                    height={220}
                    chartConfig={{
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    accessor={"population"}
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />
            </Card>
        </ScrollView>
    );
};

export default BabyDetail;
