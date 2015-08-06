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
#import "RNAMapView.h"

@implementation RNAMapViewManager

RCT_EXPORT_MODULE();

RCT_EXPORT_VIEW_PROPERTY(zoomLevel, double);


- (UIView *)view
{
  RNAMapView *mapView = [[RNAMapView alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
  
  return mapView;
}

@end
