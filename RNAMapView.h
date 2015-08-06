//
//  RNAMapView.h
//  TestWebView
//
//  Created by LiuQifeng on 15/8/6.
//  Copyright © 2015年 Facebook. All rights reserved.
//
#import <UIKit/UIKit.h>
#import <MAMapKit/MAMapKit.h>
#import "RCTView.h"

@class RCTEventDispatcher;

@interface RNAMapView : RCTView <MAMapViewDelegate>

@property (nonatomic, assign) double zoomLevel;

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;

- (void) addHotMap;

@end
