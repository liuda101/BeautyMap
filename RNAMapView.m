//
//  RNAMapView.m
//  TestWebView
//
//  Created by LiuQifeng on 15/8/6.
//  Copyright © 2015年 Facebook. All rights reserved.
//

#import "RNAMapView.h"
#import "RCTUtils.h"

@implementation RNAMapView
{
  RCTEventDispatcher *_eventDispatcher;
  MAMapView *_mapView;
  MAHeatMapTileOverlay *_hotOverlay;
}

RCT_NOT_IMPLEMENTED(-initWithFrame:(CGRect)frame)
RCT_NOT_IMPLEMENTED(-initWithCoder:(NSCoder *)aDecoder)


- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
  if ((self = [super initWithFrame:CGRectZero])) {
    super.backgroundColor = [UIColor clearColor];
    
    _eventDispatcher = eventDispatcher;
    
    CGRect bounds = [UIScreen mainScreen].bounds;
    
    _mapView = [[MAMapView alloc] initWithFrame:CGRectMake(0, 0, CGRectGetWidth(bounds), CGRectGetHeight(bounds))];
    [MAMapServices sharedServices].apiKey = @"63f362737c7ffee3c29e2ee7fee6b4c7";
    _mapView.showsCompass= NO;
    _mapView.showsScale = NO;
    
    _mapView.logoCenter = CGPointMake(CGRectGetMidX(bounds), CGRectGetMaxY(bounds) - 20);
    
    _mapView.delegate = self;
    
    
    [self addSubview:_mapView];
  }
  
  return self;
}

- (void)renderHotMap:(NSArray *)mapArray
{
  if (_hotOverlay != nil) {
    [_mapView removeOverlay:_hotOverlay];
  }
  _hotOverlay = [[MAHeatMapTileOverlay alloc] init];
  
  NSMutableArray * data = [NSMutableArray array];
  
  for (NSDictionary *dic in mapArray) {
    MAHeatMapNode *node = [[MAHeatMapNode alloc] init];
    
    CLLocationCoordinate2D coordinate;
    coordinate.latitude = [dic[@"latitude"] doubleValue];
    coordinate.longitude = [dic[@"longitude"] doubleValue];
    node.coordinate = coordinate;
    
    node.intensity = [dic[@"intensity"] doubleValue];
    
    [data addObject:node];
  }
  
  _hotOverlay.data = data;
  
  _hotOverlay.radius = 25;
  
  [_mapView addOverlay: _hotOverlay];
}

- (void)moveCenter:(NSDictionary *)center
{
  CLLocationCoordinate2D coordinate;
  coordinate.latitude = [center[@"latitude"] doubleValue];
  coordinate.longitude = [center[@"longitude"] doubleValue];
  [_mapView setCenterCoordinate:coordinate animated:YES];
}

- (double)zoomLevel
{
  return _mapView.zoomLevel;
}

- (void)setZoomLevel:(double)zoomLevel
{
  [_mapView setZoomLevel:zoomLevel animated:NO];
}

#pragma # MapView Delegate

- (MAOverlayView *)mapView:(MAMapView *)mapView viewForOverlay:(id<MAOverlay>)overlay
{
  if ([overlay isKindOfClass:[MATileOverlay class]])
  {
    MATileOverlayView *tileOverView = [[MATileOverlayView alloc] initWithTileOverlay:overlay];
    return tileOverView;
  }
  
  return nil;
}

@end
