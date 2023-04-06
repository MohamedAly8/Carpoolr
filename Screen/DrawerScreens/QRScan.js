import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Linking, View, Image, ImageBackground, BackHandler } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const QRScan = () => {
    const [scan, setScan] = useState(false);
    const [scanResult, setScanResult] = useState(false);
    const [result, setResult] = useState(null);

    const onSuccess = (e) => {
        const check = e.data.substring(0, 4);
        console.log('scanned data' + check);
        setResult(e)
        setScan(false)
        setScanResult(true)
        if (check === 'http') {
            Linking.openURL(e.data).catch(err => console.error('An error occured', err));
        } else {
            this.setState({
                result: e,
                scan: false,
                ScanResult: true
            });
        }
    }
    const activeQR = () => {
       setScan(true);
    }
    scanAgain = () => {
        setScan(true);
        setScanResult(false)
    }

    return (
        <View style={styles.scrollViewStyle}>
            <Fragment>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=> BackHandler.exitApp()}>
                        <Image source={require('../Image/back.svg')} style={{height: 36, width: 36}}></Image>
                    </TouchableOpacity>
                    <Text style={styles.textTitle}>Scan QR Code</Text>
                </View>
                {!scan && !ScanResult &&
                    <View style={styles.cardView} >
                        <Image source={require('../Image/camera.png')} style={{height: 36, width: 36}}></Image>
                        <Text numberOfLines={8} style={styles.descText}>Please move your camera {"\n"} over the QR Code</Text>
                        <Image source={require('../Image/qrcode.png')} style={{margin: 20}}></Image>
                        <TouchableOpacity onPress={activeQR} style={styles.buttonScan}>
                            <View style={styles.buttonWrapper}>
                            <Image source={require('../Image/camera.png')} style={{height: 36, width: 36}}></Image>
                            <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Scan QR Code</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
                {ScanResult &&
                    <Fragment>
                        <Text style={styles.textTitle1}>Result</Text>
                        <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                            <Text>Type : {result.type}</Text>
                            <Text>Result : {result.data}</Text>
                            <Text numberOfLines={1}>RawData: {result.rawData}</Text>
                            <TouchableOpacity onPress={scanAgain} style={styles.buttonScan}>
                                <View style={styles.buttonWrapper}>
                                    <Image source={require('../Image/camera.png')} style={{height: 36, width: 36}}></Image>
                                    <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Click to scan again</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Fragment>
                }
                {scan &&
                    <QRCodeScanner
                        reactivate={true}
                        showMarker={true}
                        ref={(node) => { this.scanner = node }}
                        onRead={onSuccess}
                        topContent={
                            <Text style={styles.centerText}>
                               Please move your camera {"\n"} over the QR Code
                            </Text>
                        }
                        bottomContent={
                            <View>
                                <ImageBackground source={require('../Image/bottom-panel.png')} style={styles.bottomContent}>
                                    <TouchableOpacity style={styles.buttonScan2}
                                        onPress={() => this.scanner.reactivate()}
                                        onLongPress={() => setScan(false)}>
                                        <Image source={require('../Image/camera2.png')}></Image>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                        }
                    />
                }
            </Fragment>
        </View>
    );
};

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const styles = {
    scrollViewStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#692AD5'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '10%',
        paddingLeft: 15,
        paddingTop: 10,
        width: deviceWidth,
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'white'
    },
    textTitle1: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'white'
    },
    cardView: {
        width: deviceWidth - 32,
        height: deviceHeight - 350,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        padding: 25,
        marginLeft: 5,
        marginRight: 5,
        marginTop: '10%',
        backgroundColor: 'white'
    },
    scanCardView: {
        width: deviceWidth - 32,
        height: deviceHeight / 2,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 25,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: 'white'
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonScan: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#5F28BC',
        paddingTop: 5,
        paddingRight: 25,
        paddingBottom: 5,
        paddingLeft: 25,
        marginTop: 20
    },
    buttonScan2: {
        marginLeft: deviceWidth / 2 - 50,
        width: 100,
        height: 100,
    },
    descText: {
        padding: 16,
        textAlign: 'center',
        fontSize: 16
    },
    highlight: {
        fontWeight: '700',
    },
    centerText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        padding: 32,
        color: 'white',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    bottomContent: {
       width: deviceWidth,
       height: 120,
    },
    buttonTouchable: {
        fontSize: 21,
        backgroundColor: 'white',
        marginTop: 32,
        width: deviceWidth - 62,
        justifyContent: 'center',
        alignItems: 'center',
        height: 44
    },
    buttonTextStyle: {
        color: 'black',
        fontWeight: 'bold',
    }
}

export default QRScan;
