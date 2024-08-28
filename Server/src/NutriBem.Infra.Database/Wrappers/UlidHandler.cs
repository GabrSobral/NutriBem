namespace NutriBem.Infra.Database.Wrappers;

public class UlidToBytesConverter(ConverterMappingHints mappingHints = null) : ValueConverter<Ulid, byte[]>(
    convertToProviderExpression: x => x.ToByteArray(),
    convertFromProviderExpression: x => new Ulid(x),
    mappingHints: defaultHints.With(mappingHints))
{
    private static readonly ConverterMappingHints defaultHints = new(size: 16);

    public UlidToBytesConverter() : this(null) { }
}

public class UlidToStringConverter(ConverterMappingHints mappingHints = null) : ValueConverter<Ulid, string>(
    convertToProviderExpression: x => x.ToString(),
    convertFromProviderExpression: x => Ulid.Parse(x),
    mappingHints: defaultHints.With(mappingHints))
{
    private static readonly ConverterMappingHints defaultHints = new(size: 26);

    public UlidToStringConverter() : this(null) { }
}

