var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services
    .AddDbContext<DataContext>(
        options => options.UseSqlite(builder.Configuration.GetConnectionString("Default"))
    )
    .AddScoped<IAtividadeRepo, AtividadeRepo>()
    .AddScoped<IGeneralRepo, GeneralRepo>()
    .AddScoped<IAtividadeService, AtividadeService>();



builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        }
    );
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services
    .AddEndpointsApiExplorer()
    .AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "ProAtividade.API", Version = "v1" });
        })
    .AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(option =>
    option
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin()
);

app.MapControllers();

app.Run();
