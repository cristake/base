<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

        <!-- Custom title & meta for each page -->
        @yield('meta')

        <link rel="shortcut icon" href="{{ asset('favicon.ico') }}">

        <!-- Custom styles for this template -->
        @yield('before-styles-end')

        {!! HTML::style(elixir('css/frontend.css')) !!}

        @yield('after-styles-end')

        {{-- <link href='//fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'> --}}

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
            <script src="//oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
            <script src="//oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>

    <body>

        <!-- Fixed navbar -->
        <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Project name</a>
                </div>

                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        @foreach($pages as $page)
                            @if($page->parent_id == 0)
                                <li class="{!! $page->hasChildren() ? 'dropdown' : '' !!}">
                                    <a href="{{ $page->hasChildren() ? url(sprintf('%s/%s', $page->slug, $page->firstChild()->slug)) : url($page->slug) }}" 
                                        class="dropdown-toggle" 
                                        data-toggle="dropdown" 
                                        role="button" 
                                        aria-haspopup="true" 
                                        aria-expanded="false"
                                    >
                                        {!! $page->name !!}
                                        {!! $page->hasChildren() ? ' <span class="caret"></span>' : '' !!}
                                    </a>

                                    @include('_frontend.home.submenus', ['id' => $page->id])
                                </li>
                            @endif
                        @endforeach
                    </ul>

                    <ul class="nav navbar-nav navbar-right">
                        {{-- <li><a href="../navbar/">Default</a></li> --}}
                        {{-- <li><a href="../navbar-static-top/">Static top</a></li> --}}
                        {{-- <li class="active"><a href="./">Fixed top <span class="sr-only">(current)</span></a></li> --}}
                    </ul>
                </div><!--/.nav-collapse -->
            </div>
        </nav>

        <div class="container">

            <!-- Main component for a primary marketing message or call to action -->
            <div class="jumbotron">
                <h1>Navbar example</h1>
                <p>This example is a quick exercise to illustrate how the default, static and fixed to top navbar work. It includes the responsive CSS and HTML, so it also adapts to your viewport and device.</p>
                <p>To see the difference between static and fixed top navbars, just scroll.</p>
                <p><a class="btn btn-lg btn-primary" href="../../components/#navbar" role="button">View navbar docs &raquo;</a></p>
            </div>

        </div> <!-- /container -->


        <!-- Scripts -->
        @yield('before-scripts-end')
        {!! HTML::script(elixir('js/frontend.js')) !!}
        @yield('after-scripts-end')
        @include('sweet::alert')
    </body>
</html>
