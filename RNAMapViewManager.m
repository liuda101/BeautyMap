//
//  RNAMapViewManager.m
//  TestWebView
//
//  Created by LiuQifeng on 15/8/6.
//  Copyright © 2015年 Facebook. All rights reserved.
//

#import "RNAMapViewManager.h"
#import "RCTBridge.h"
#import "RCTUIManager.h"
#import "RCTSparseArray.h"
#import "RNAMapView.h"

@implementation RNAMapViewManager

RCT_EXPORT_MODULE();

RCT_EXPORT_VIEW_PROPERTY(zoomLevel, double);

RCT_EXPORT_METHOD(renderHotMap:(NSNumber *)reactTag
                  mapArray:(NSArray *)mapArray
                  callback:(RCTResponseSenderBlock)callback)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, RCTSparseArray *viewRegistry) {
    
    RNAMapView *mapView = viewRegistry[reactTag];
    if (![mapView isKindOfClass:[RNAMapView class]]) {
      return;
    }
    
    [mapView renderHotMap:mapArray];
  }];
}

RCT_EXPORT_METHOD(setCenter:(NSNumber *)reactTag
                  center:(NSDictionary *)center
                  callback:(RCTResponseSenderBlock)callback)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, RCTSparseArray *viewRegistry) {
    
    RNAMapView *mapView = viewRegistry[reactTag];
    if (![mapView isKindOfClass:[RNAMapView class]]) {
      return;
    }
    
    [mapView moveCenter:center];
  }];
}


- (UIView *)view
{
  RNAMapView *mapView = [[RNAMapView alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
  
  return mapView;
}

@end
