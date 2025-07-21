import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Users, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet,
  TrendingUp,
  Clock,
  MapPin,
  Star,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Download,
  Video,
  Phone
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const WebsiteAnalysis = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const refreshData = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const performanceMetrics = {
    pageSpeed: 94,
    seo: 87,
    accessibility: 91,
    bestPractices: 89,
    mobileScore: 96
  };

  const trafficData = {
    totalVisitors: 45678,
    uniqueVisitors: 32145,
    pageViews: 123456,
    bounceRate: 34.2,
    avgSessionDuration: '4:32',
    conversionRate: 3.8
  };

  const deviceBreakdown = [
    { name: 'Mobile', percentage: 58, users: 26424, color: 'bg-blue-500' },
    { name: 'Desktop', percentage: 35, users: 15950, color: 'bg-green-500' },
    { name: 'Tablet', percentage: 7, users: 3189, color: 'bg-purple-500' }
  ];

  const topPages = [
    { path: '/', views: 23456, bounce: 28.5 },
    { path: '/search', views: 18234, bounce: 31.2 },
    { path: '/hotel/:id', views: 15678, bounce: 25.8 },
    { path: '/flights', views: 12345, bounce: 42.1 },
    { path: '/profile', views: 8901, bounce: 18.9 }
  ];

  const geographicData = [
    { country: 'India', percentage: 45, users: 20555 },
    { country: 'United States', percentage: 18, users: 8212 },
    { country: 'United Kingdom', percentage: 12, users: 5481 },
    { country: 'Canada', percentage: 8, users: 3651 },
    { country: 'Australia', percentage: 7, users: 3197 },
    { country: 'Others', percentage: 10, users: 4560 }
  ];

  const issuesAndRecommendations = [
    {
      type: 'warning',
      title: 'Image Optimization',
      description: 'Some images are not optimized for web delivery',
      impact: 'Medium',
      recommendation: 'Use WebP format and implement lazy loading'
    },
    {
      type: 'success',
      title: 'HTTPS Security',
      description: 'All pages are served over HTTPS',
      impact: 'High',
      recommendation: 'Continue maintaining SSL certificates'
    },
    {
      type: 'error',
      title: 'Mobile Responsiveness',
      description: 'Minor layout issues on certain mobile devices',
      impact: 'Low',
      recommendation: 'Test on more device viewport sizes'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <RefreshCw className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Analyzing Website Performance</h2>
            <p className="text-gray-600">Gathering comprehensive data and insights...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Website Analysis Report
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-6">
              Comprehensive insights into your website's performance, user behavior, and optimization opportunities
            </p>
            
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={refreshData} 
                disabled={refreshing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {refreshing ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Refresh Data
              </Button>
              
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              
              {/* Video Call Button */}
              <Button 
                variant="outline" 
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 hover:from-green-600 hover:to-emerald-600"
                onClick={() => window.open('https://meet.google.com/', '_blank')}
              >
                <Video className="h-4 w-4 mr-2" />
                Schedule Analysis Call
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid grid-cols-2 lg:grid-cols-5 w-full max-w-4xl mx-auto bg-white/50 backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="traffic">Traffic</TabsTrigger>
              <TabsTrigger value="user-behavior">User Behavior</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="glass-effect border-white/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Users className="h-8 w-8 text-blue-600" />
                      <Badge variant="outline" className="text-green-600">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        +12.5%
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{trafficData.totalVisitors.toLocaleString()}</h3>
                    <p className="text-gray-600">Total Visitors</p>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-white/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Globe className="h-8 w-8 text-green-600" />
                      <Badge variant="outline" className="text-green-600">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        +8.3%
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{trafficData.pageViews.toLocaleString()}</h3>
                    <p className="text-gray-600">Page Views</p>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-white/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                      <Badge variant="outline" className="text-red-600">
                        <ArrowDown className="h-3 w-3 mr-1" />
                        -2.1%
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{trafficData.bounceRate}%</h3>
                    <p className="text-gray-600">Bounce Rate</p>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-white/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Star className="h-8 w-8 text-orange-600" />
                      <Badge variant="outline" className="text-green-600">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        +5.7%
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{trafficData.conversionRate}%</h3>
                    <p className="text-gray-600">Conversion Rate</p>
                  </CardContent>
                </Card>
              </div>

              {/* Device Breakdown */}
              <Card className="glass-effect border-white/30">
                <CardHeader>
                  <CardTitle>Device Usage Distribution</CardTitle>
                  <CardDescription>How users access your website across different devices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deviceBreakdown.map((device) => (
                      <div key={device.name} className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 w-24">
                          {device.name === 'Mobile' && <Smartphone className="h-4 w-4" />}
                          {device.name === 'Desktop' && <Monitor className="h-4 w-4" />}
                          {device.name === 'Tablet' && <Tablet className="h-4 w-4" />}
                          <span className="font-medium">{device.name}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600">{device.users.toLocaleString()} users</span>
                            <span className="text-sm font-medium">{device.percentage}%</span>
                          </div>
                          <Progress value={device.percentage} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(performanceMetrics).map(([metric, score]) => (
                  <Card key={metric} className="glass-effect border-white/30">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="mb-4">
                          <div className="text-3xl font-bold text-gray-800">{score}</div>
                          <div className="text-sm text-gray-600 capitalize">{metric.replace(/([A-Z])/g, ' $1')}</div>
                        </div>
                        <Progress value={score} className="h-3" />
                        <div className="mt-2">
                          {score >= 90 && <Badge className="bg-green-100 text-green-800">Excellent</Badge>}
                          {score >= 70 && score < 90 && <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>}
                          {score < 70 && <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="traffic" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Pages */}
                <Card className="glass-effect border-white/30">
                  <CardHeader>
                    <CardTitle>Top Pages</CardTitle>
                    <CardDescription>Most visited pages on your website</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topPages.map((page, index) => (
                        <div key={page.path} className="flex items-center justify-between p-3 rounded-lg bg-white/50">
                          <div>
                            <div className="font-medium">{page.path}</div>
                            <div className="text-sm text-gray-600">{page.views.toLocaleString()} views</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{page.bounce}%</div>
                            <div className="text-xs text-gray-600">Bounce Rate</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Geographic Distribution */}
                <Card className="glass-effect border-white/30">
                  <CardHeader>
                    <CardTitle>Geographic Distribution</CardTitle>
                    <CardDescription>Where your visitors are coming from</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {geographicData.map((country) => (
                        <div key={country.country} className="flex items-center space-x-4">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium">{country.country}</span>
                              <span className="text-sm text-gray-600">{country.percentage}%</span>
                            </div>
                            <Progress value={country.percentage} className="h-2" />
                          </div>
                          <div className="text-sm text-gray-600">
                            {country.users.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="user-behavior" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-effect border-white/30">
                  <CardContent className="p-6 text-center">
                    <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800">{trafficData.avgSessionDuration}</h3>
                    <p className="text-gray-600">Avg. Session Duration</p>
                  </CardContent>
                </Card>
                
                <Card className="glass-effect border-white/30">
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800">{trafficData.uniqueVisitors.toLocaleString()}</h3>
                    <p className="text-gray-600">Unique Visitors</p>
                  </CardContent>
                </Card>
                
                <Card className="glass-effect border-white/30">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800">2.7</h3>
                    <p className="text-gray-600">Pages per Session</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <div className="space-y-4">
                {issuesAndRecommendations.map((item, index) => (
                  <Card key={index} className="glass-effect border-white/30">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {item.type === 'success' && <CheckCircle className="h-6 w-6 text-green-600" />}
                          {item.type === 'warning' && <AlertCircle className="h-6 w-6 text-yellow-600" />}
                          {item.type === 'error' && <AlertCircle className="h-6 w-6 text-red-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-800">{item.title}</h3>
                            <Badge 
                              variant="outline"
                              className={`
                                ${item.impact === 'High' ? 'border-red-300 text-red-700' : ''}
                                ${item.impact === 'Medium' ? 'border-yellow-300 text-yellow-700' : ''}
                                ${item.impact === 'Low' ? 'border-green-300 text-green-700' : ''}
                              `}
                            >
                              {item.impact} Impact
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{item.description}</p>
                          <p className="text-sm text-blue-600 font-medium">
                            💡 {item.recommendation}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Contact Support */}
              <Card className="glass-effect border-white/30 bg-gradient-to-r from-blue-50 to-purple-50">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Need Expert Analysis?</h3>
                  <p className="text-gray-600 mb-6">
                    Get personalized recommendations from our optimization experts
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      onClick={() => window.open('https://meet.google.com/', '_blank')}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Schedule Video Call
                    </Button>
                    <Button variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Request Callback
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WebsiteAnalysis;